const { match, throws, strictEqual: eq } = require('node:assert');
const { describe, it } = require('zunit');

const { napiSync: napi } = require('..');

describe('napi-sync', () => {
  it('should execute a command without arguments', () => {
    const output = napi().ls();
    match(output, /napi@\d+\.\d+\.\d+/);
    match(output, /zunit@\d+\.\d+\.\d+/);
  });

  it('should execute a command with simple arguments', () => {
    const output = napi().view('express', 'version');
    match(output, /\d+\.\d+\.\d+/);
  });

  it('should execute a command with long options', () => {
    const output = napi().ls({ omit: 'dev', json: true, long: undefined });
    const report = JSON.parse(output);
    eq(Object.keys(report).includes('dependencies'), false);
    eq(report.description, 'A programmatic api for npm');
  });

  it('should support child process options', () => {
    const options = { cwd: __dirname };
    const output = napi({ options }).exec('-c', 'pwd');
    match(output, new RegExp('/napi/test$'));
  });

  it('should report commands that fail', () => {
    throws(() => napi().exec('-c', "'exit 1'", { silent: true }), (err) => {
      match(err.message, /Command failed: npm exec -c 'exit 1'/);
      return true;
    });
  });

  it('should capture stderr', () => {
    const i = Math.floor(Math.random() * (1000000)) + 1000000;
    const packageName = `does-not-exist-${i}`;
    const options = { stdio: 'pipe' };
    throws(() => napi({ options }).view(packageName), (err) => {
      match(err.message, new RegExp(`Command failed: npm view ${packageName}`));
      match(err.stderr.toString(), /npm ERR! code E404/);
      return true;
    });
  });
});
