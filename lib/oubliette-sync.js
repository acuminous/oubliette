const exec = require('node:child_process').execSync;

const oubliette = require('./oubliette');
const stringFormat = require('./formats/string-format');

module.exports = (config = {}) => {
  const options = config.options || {};
  const format = config.format || stringFormat;
  return oubliette(commandFactory);

  function commandFactory(name, serialise) {
    return (...args) => {
      const command = `npm ${name} ${serialise(...args)}`.trim();
      const output = exec(command, options);
      return format(output);
    };
  }
};
