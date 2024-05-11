import { syncApi as npm, formats } from '../..';
const { jsonFormat: format } = formats;

const version = npm({ format }).view('express', 'version', { json: true });
console.log(`The latest version of express is v${version}`);