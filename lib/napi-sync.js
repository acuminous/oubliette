const exec = require('node:child_process').execSync;
const napi = require('./napi');

module.exports = (options) => {
  return napi(commandFactory);

  function commandFactory(name, serialise, format) {
    return (...args) => {
      const command = `npm ${name} ${serialise(...args)}`.trim();
      const output = exec(command, options);
      return format(output);
    };
  }
};
