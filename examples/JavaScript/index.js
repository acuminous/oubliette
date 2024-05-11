const { syncApi: npm, formats } = require('../..');

const { jsonFormat: format } = formats;

const version = npm({ format }).view('express', 'version', { json: true });
console.log(`The latest version of express is v${version}`);
