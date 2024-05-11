const commands = require('./commands.json');

module.exports = (commandFactory) => {
  return commands.reduce(toApi(commandFactory), {});
};

function toApi(commandFactory) {
  return (api, name) => {
    return {
      ...api,
      [name]: commandFactory(name, serialise),
    };
  };
}

function serialise(...args) {
  return args.reduce(toCommandLineArguments(args), '');
}

function toCommandLineArguments() {
  return (command, arg) => {
    switch (typeof arg) {
      case 'object': {
        return Object.keys(arg).reduce(toLongOptions(arg), command);
      }
      default: {
        return `${command} ${arg}`.trim();
      }
    }
  };
}

function toLongOptions(args) {
  return (command, key) => {
    const value = args[key] || '';
    return `${command} --${key} ${value}`.trim();
  };
}
