const exec = require('node:child_process').exec;

const oubliette = require('./oubliette');
const stringFormat = require('./formats/string-format');

module.exports = (config = {}) => {
  const options = config.options || {};
  const format = config.format || stringFormat;
  return oubliette(commandFactory);

  function commandFactory(name, serialise) {
    return async (...args) => {
      const command = `npm ${name} ${serialise(...args)}`.trim();
      return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
          if (error) {
            reject(Object.assign(error, { stdout, stderr }));
          } else {
            resolve(format(stdout));
          }
        });
      });
    };
  }
};
