const exec = require('node:child_process').execSync;
const napi = require('./napi');

module.exports = (options) => {
	return napi(commandFactory);

	function commandFactory(name, serialise, format) {
		return function(...args) {
			const command = `npm ${name} ${serialise(...args)}`;
			const output = exec(command, options);
			return format(output);
		}
	}
}
