# napi - a programmatic api for npm

[![NPM version](https://img.shields.io/npm/v/napi.svg?style=flat-square)](https://www.npmjs.com/package/napi)
[![Node.js CI](https://github.com/acuminous/napi/workflows/Node.js%20CI/badge.svg)](https://github.com/acuminous/napi/actions?query=workflow%3A%22Node.js+CI%22)
[![Code Climate](https://codeclimate.com/github/acuminous/napi/badges/gpa.svg)](https://codeclimate.com/github/acuminous/napi)
[![Test Coverage](https://codeclimate.com/github/acuminous/napi/badges/coverage.svg)](https://codeclimate.com/github/acuminous/napi/coverage)
[![Discover zUnit](https://img.shields.io/badge/Discover-zUnit-brightgreen)](https://www.npmjs.com/package/zunit)


## TL;DR

Use the asynchronous API
```js
const { napiAsync: npm } = require('napi');
await npm().install('express');
````

User the synchronous API
```js
const { napiSync: npm } = require('napi');
npm().install('express');
````

Execute any npm command with multiple arguments
```js
npm().install('express', 'pg', 'debug');
````

Execute any npm command with short options
```js
npm().install('nodemon', { 'g': true });
````

Execute any npm command with long options
```js
npm().install('nodemon', { 'global': true, 'install-strategy': 'shallow' });
````

### Parsing Output
napi uses NodeJS [child_process.exec](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options ) and [child_process.execAsync](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) under the hood. These sometimes return stdout as a [Buffer](https://nodejs.org/api/buffer.html). napi converts this to a string by default;

```js
const output = npm().view('express');
````

This is inconvenient if you want JSON output for commands that support the `--json` long option, so instead you can specify a format function

```js
const { formats: { jsonFormat: format } } = require('napi'); 
const json = npm({ format }).view('express', { json: true });
```

You can also receive the output as a buffer consistently
```js
const { formats: { bufferFormat: format } } = require('napi'); 
const buffer = npm({ format }).view('express', { json: true });
```

Finally you can receive the raw output
```js
const { formats: { rawFormat: format } } = require('napi'); 
const output = npm({ format }).view('express', { json: true });
```

## Child Process Options
You can specify any of the [child_process.exec](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options ) and [child_process.execAsync](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) options.

```js
const options = { cwd: __dirname };
await napi({ options }).exec('-c', 'pwd');
```

### Error Handling
Handle errors by wrapping the npm command in a try/catch

```js
try {
  const output = await napi().view('express', 'version', { json: true });
} catch (err) {
  console.error(err);
}
```
The error will be decorated with `stdout` and `stderr` properties.

