import { ExecSyncOptions } from 'child_process';
import { syncApi as npm, formats } from '../..';
const { jsonFormat: format } = formats;

const options: ExecSyncOptions = {
  timeout: 5000,
};

const version = npm({ format, options }).view('express', 'version', { json: true });
console.log(`The latest version of express is v${version}`);