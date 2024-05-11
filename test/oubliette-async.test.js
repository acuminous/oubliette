const { match, rejects, strictEqual: eq } = require('node:assert');
const { describe, it } = require('zunit');

const { asyncApi: npm, formats } = require('..');

describe('Async API', () => {
  it('should execute a command without arguments', async () => {
    const output = await npm().ls();
    match(output, /oubliette@\d+\.\d+\.\d+/);
    match(output, /zunit@\d+\.\d+\.\d+/);
  });

  it('should execute a command with simple arguments', async () => {
    const output = await npm().view('express', 'version');
    match(output, /\d+\.\d+\.\d+/);
  });

  it('should execute a command with long options', async () => {
    const output = await npm().ls({ omit: 'dev', json: true, long: undefined });
    const report = JSON.parse(output);
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic interface for npm');
  });

  it('should support commands with hyphens', async () => {
    const output = await npm()['find-dupes']();
    match(output, /up to date/);
  });

  it('should alias commands with hyphens', async () => {
    const output = await npm().findDupes();
    match(output, /up to date in/);
  });

  it('should support child process options', async () => {
    const options = { cwd: __dirname };
    const output = await npm({ options }).exec('-c', 'pwd');
    match(output, new RegExp('/oubliette/test$'));
  });

  it('should format output as json', async () => {
    const format = formats.jsonFormat;
    const report = await npm({ format }).ls({ omit: 'dev', json: true, long: undefined });
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic interface for npm');
  });

  it('should format output as a buffer', async () => {
    const format = formats.bufferFormat;
    const buffer = await npm({ format }).ls({ omit: 'dev', json: true, long: undefined });
    eq(Buffer.isBuffer(buffer), true);
  });

  it('should leave output unformatted', async () => {
    const format = formats.rawFormat;
    const buffer = await npm({ format }).ls();
    eq(Buffer.isBuffer(buffer), false);
  });

  it('should report commands that fail', async () => {
    await rejects(() => npm().exec('-c', "'exit 1'"), (err) => {
      match(err.message, /Command failed: npm exec -c 'exit 1'/);
      return true;
    });
  });

  it('should capture stderr', async () => {
    const i = Math.floor(Math.random() * (1000000)) + 1000000;
    const packageName = `does-not-exist-${i}`;
    await rejects(() => npm().view(packageName), (err) => {
      match(err.message, new RegExp(`Command failed: npm view ${packageName}`));
      match(err.stderr.toString(), /npm ERR! code E404/);
      return true;
    });
  });
});
