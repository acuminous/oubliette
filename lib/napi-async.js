const { promisify } = require('node:util');
const exec = promisify(require('node:child_process').exec);
const napi = require('./napi');

module.exports = (options) => {
	return napi(commandFactory);

	function commandFactory(name, serialise, format) {
		return async function(...args) {
			const command = `npm ${name} ${serialise(...args)}`;
			const { stdout: output } = await exec(command, options);
			return format(output);
		}
	}
}

