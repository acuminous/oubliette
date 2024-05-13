const { syncApi: npm, formats } = require('../..');

const { jsonFormat: format } = formats;

const options = {
  timeout: 5000,
};

const version = npm({ format, options }).view('express', 'version', { json: true });
console.log(`The latest version of express is v${version}`);
