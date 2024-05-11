const exec = require('node:child_process').exec;
const napi = require('./napi');

module.exports = (config = {}) => {
  const options = config.options || {};
  return napi(commandFactory);

  function commandFactory(name, serialise, format) {
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
