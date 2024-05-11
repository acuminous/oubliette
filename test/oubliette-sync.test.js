const { match, throws, strictEqual: eq } = require('node:assert');
const { describe, it } = require('zunit');

const { syncApi: npm, formats } = require('..');

describe('Sync API', () => {
  it('should execute a command without arguments', () => {
    const output = npm().ls();
    match(output, /oubliette@\d+\.\d+\.\d+/);
    match(output, /zunit@\d+\.\d+\.\d+/);
  });

  it('should execute a command with simple arguments', () => {
    const output = npm().view('express', 'version');
    match(output, /\d+\.\d+\.\d+/);
  });

  it('should execute a command with long options', () => {
    const output = npm().ls({ omit: 'dev', json: true, long: undefined });
    const report = JSON.parse(output);
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic api for npm');
  });

  it('should support commands with hyphens', () => {
    const output = npm()['find-dupes']();
    match(output, /up to date/);
  });

  it('should alias commands with hyphens', () => {
    const output = npm().findDupes();
    match(output, /up to date in/);
  });

  it('should support child process options', () => {
    const options = { cwd: __dirname };
    const output = npm({ options }).exec('-c', 'pwd');
    match(output, new RegExp('/oubliette/test$'));
  });

  it('should format output as json', async () => {
    const format = formats.jsonFormat;
    const report = npm({ format }).ls({ omit: 'dev', json: true, long: undefined });
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic api for npm');
  });

  it('should format output as a buffer', async () => {
    const format = formats.bufferFormat;
    const buffer = npm({ format }).ls({ omit: 'dev', json: true, long: undefined });
    eq(Buffer.isBuffer(buffer), true);
  });

  it('should leave output unformatted', async () => {
    const format = formats.rawFormat;
    const buffer = npm({ format }).ls();
    eq(Buffer.isBuffer(buffer), true);
  });

  it('should report commands that fail', () => {
    throws(() => npm().exec('-c', "'exit 1'", { silent: true }), (err) => {
      match(err.message, /Command failed: npm exec -c 'exit 1'/);
      return true;
    });
  });

  it('should capture stderr', () => {
    const i = Math.floor(Math.random() * (1000000)) + 1000000;
    const packageName = `does-not-exist-${i}`;
    const options = { stdio: 'pipe' };
    throws(() => npm({ options }).view(packageName), (err) => {
      match(err.message, new RegExp(`Command failed: npm view ${packageName}`));
      match(err.stderr.toString(), /npm ERR! code E404/);
      return true;
    });
  });
});
