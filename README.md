# napi - A programmatic api for npm

[![NPM version](https://img.shields.io/npm/v/napi.svg?style=flat-square)](https://www.npmjs.com/package/napi)
[![Node.js CI](https://github.com/acuminous/napi/workflows/Node.js%20CI/badge.svg)](https://github.com/acuminous/napi/actions?query=workflow%3A%22Node.js+CI%22)
[![Code Climate](https://codeclimate.com/github/acuminous/napi/badges/gpa.svg)](https://codeclimate.com/github/acuminous/napi)
[![Test Coverage](https://codeclimate.com/github/acuminous/napi/badges/coverage.svg)](https://codeclimate.com/github/acuminous/napi/coverage)
[![Discover zUnit](https://img.shields.io/badge/Discover-zUnit-brightgreen)](https://www.npmjs.com/package/zunit)


## TL;DR

### async
```js
const { napiAsync: napi } = require('napi');

try {
  const output = await napi().view('express', 'version', { json: true });
  const version = JSON.parse(output);
  console.log({ version });
} catch (err) {
  console.error(err);
}
```

### sync
```js
const { napiSync: napi } = require('napi');

try {
  const output = napi().view('express', 'version', { json: true });
  const version = JSON.parse(output);
  console.log({ version });
} catch (err) {
  console.error(err);
}
```

## Supported Commands

See the [command list](https://github.com/acuminous/napi/blob/main/lib/commands.json)

## Options

```js
await napi({
  timeout: 1000,
  cwd: __dirname,  
}).view('express', 'version', { json: true });
```

See the NodeJS [child_process.exec](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options ) and [child_process.execAsync](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) options
