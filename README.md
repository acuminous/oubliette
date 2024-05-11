# oubliette - a programmatic api for npm

[![NPM version](https://img.shields.io/npm/v/oubliette.svg?style=flat-square)](https://www.npmjs.com/package/oubliette)
[![Node.js CI](https://github.com/acuminous/oubliette/workflows/Node.js%20CI/badge.svg)](https://github.com/acuminous/oubliette/actions?query=workflow%3A%22Node.js+CI%22)
[![Code Climate](https://codeclimate.com/github/acuminous/oubliette/badges/gpa.svg)](https://codeclimate.com/github/acuminous/oubliette)
[![Test Coverage](https://codeclimate.com/github/acuminous/oubliette/badges/coverage.svg)](https://codeclimate.com/github/acuminous/oubliette/coverage)
[![Discover zUnit](https://img.shields.io/badge/Discover-zUnit-brightgreen)](https://www.npmjs.com/package/zunit)

The programmatic API was removed from npm in v8.0.0. Since then the only option for using npm from NodeJs is by executing the npm binary. This module wraps the exec call within convenient asynchronous and synchronous APIs.

## Usage

Asynchronous API
```js
const { asyncApi: npm } = require('oubliette');
await npm().install('express');
````

Synchronous API
```js
const { syncApi: npm } = require('oubliette');
npm().install('express');
````

Execute a [supported npm command](https://raw.githubusercontent.com/acuminous/oubliette/main/lib/commands.json) with multiple arguments
```js
npm().install('express', 'pg', 'debug');
````

Execute [supported npm command](https://raw.githubusercontent.com/acuminous/oubliette/main/lib/commands.json) with short options
```js
npm().install('nodemon', { 'g': true });
````

Execute a [supported npm command](https://raw.githubusercontent.com/acuminous/oubliette/main/lib/commands.json) with long options
```js
npm().install('nodemon', { 'global': true, 'install-strategy': 'shallow' });
````

## Parsing Output
oubliette uses NodeJS [child_process.exec](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options ) and [child_process.execAsync](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) under the hood. These sometimes return stdout as a [Buffer](https://nodejs.org/api/buffer.html). oubliette converts this to a string by default;

```js
const output = npm().view('express');
````

This is inconvenient if you want JSON output for commands that support the `--json` long option, so instead you can specify a format function

```js
const { formats: { jsonFormat: format } } = require('oubliette'); 
const json = npm({ format }).view('express', { json: true });
```

You can also receive the output as a buffer consistently
```js
const { formats: { bufferFormat: format } } = require('oubliette'); 
const buffer = npm({ format }).view('express', { json: true });
```

Finally you can receive the raw output
```js
const { formats: { rawFormat: format } } = require('oubliette'); 
const output = npm({ format }).view('express', { json: true });
```

## Child Process Options
You can specify any of the [child_process.exec](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options ) and [child_process.execAsync](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) options.

```js
const options = { cwd: __dirname };
await npm({ options }).exec('-c', 'pwd');
```

## Error Handling
Handle errors by wrapping the npm command in a try/catch

```js
try {
  const output = await npm().view('express', 'version', { json: true });
} catch (err) {
  console.error(err);
}
```
The error will be decorated with `stdout` and `stderr` properties.

