const commands = require('./commands');

module.exports = (commandFactory) => {
	return commands.reduce(toApi(commandFactory), {});
}

function toApi(commandFactory) {
	return (api, name) => {
		return {
			...api,
			[name]: commandFactory(name, serialise, format),
		}
	}
};

function serialise(...args) {
	return args.reduce(toCommandLineArguments(args), '');
}

function format(output) {
	return output.toString().trim();
}

function toCommandLineArguments(args) {
	return (command, arg) => {
		switch (typeof arg) {
			case 'object': {
				return Object.keys(arg).reduce(toLongOptions(args), command);
			}
			default: {
				return `${command} ${arg}`;
			}
		}
	}
};

function toLongOptions(args) {
	return (command, key) => {
		const value = args[key] || '';
		return `${command} --${key} ${value}`
	}
}

