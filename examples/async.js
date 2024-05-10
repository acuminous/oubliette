const { napiAsync: napi } = require('..');

(async () => {
  try {
    const output = await napi().view('express', 'version', { json: true });
    const version = JSON.parse(output);
    console.log({ version });
  } catch (err) {
    console.error(err);
  }
})();
