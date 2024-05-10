# napi

A programmatic api for npm

## TL;DR

### async
```js
const { napiAsync: napi } = require('napi');

try {
  const options = { timeout: 1000 } 
  const output = await napi(options).view('express', 'version', { json: true });
  const version = JSON.parse(output);
  console.log({ version })  
} catch (err) {
  console.error(err)
}
```

### sync
```js
const { napiSync: napi } = require('napi');

try {
  const options = { timeout: 1000 }  
  const output = napi(options).view('express', 'version', { json: true });
  const version = JSON.parse(output);
  console.log({ version })
} catch (err) {
  console.error(err)
}
```

## Supported Commands

See the [command list](https://github.com/acuminous/lib/commands.json)

## Options
See the [child_process.exec](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options ) and [child_process.execAsync](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) options