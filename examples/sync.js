const { napiSync: napi } = require('..');

(async () => {
  try {
    const output = napi().view('express', 'version', { json: true });
    const version = JSON.parse(output);
    console.log({ version });
  } catch (err) {
    console.error(err);
  }
})();
