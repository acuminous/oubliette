const { match, rejects, strictEqual: eq } = require('node:assert');
const { describe, it } = require('zunit');

const { napiAsync: napi, formats } = require('..');

describe('napi-async', () => {
  it('should execute a command without arguments', async () => {
    const output = await napi().ls();
    match(output, /napi@\d+\.\d+\.\d+/);
    match(output, /zunit@\d+\.\d+\.\d+/);
  });

  it('should execute a command with simple arguments', async () => {
    const output = await napi().view('express', 'version');
    match(output, /\d+\.\d+\.\d+/);
  });

  it('should execute a command with long options', async () => {
    const output = await napi().ls({ omit: 'dev', json: true, long: undefined });
    const report = JSON.parse(output);
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic api for npm');
  });

  it('should support child process options', async () => {
    const options = { cwd: __dirname };
    const output = await napi({ options }).exec('-c', 'pwd');
    match(output, new RegExp('/napi/test$'));
  });

  it('should format output as json', async () => {
    const format = formats.jsonFormat;
    const report = await napi({ format }).ls({ omit: 'dev', json: true, long: undefined });
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic api for npm');
  });

  it('should format output as a buffer', async () => {
    const format = formats.bufferFormat;
    const buffer = await napi({ format }).ls({ omit: 'dev', json: true, long: undefined });
    eq(Buffer.isBuffer(buffer), true);
  });

  it('should leave output unformatted', async () => {
    const format = formats.rawFormat;
    const buffer = await napi({ format }).ls();
    eq(Buffer.isBuffer(buffer), false);
  });

  it('should report commands that fail', async () => {
    await rejects(() => napi().exec('-c', "'exit 1'"), (err) => {
      match(err.message, /Command failed: npm exec -c 'exit 1'/);
      return true;
    });
  });

  it('should capture stderr', async () => {
    const i = Math.floor(Math.random() * (1000000)) + 1000000;
    const packageName = `does-not-exist-${i}`;
    await rejects(() => napi().view(packageName), (err) => {
      match(err.message, new RegExp(`Command failed: npm view ${packageName}`));
      match(err.stderr.toString(), /npm ERR! code E404/);
      return true;
    });
  });
});
