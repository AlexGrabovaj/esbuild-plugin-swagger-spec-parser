# Esbuild Swagger Specifications Parser Plugin 

An esbuild plugin that parses the Swagger specs (YAML and JSON). 

## ⚠️ Important Notice

**This library is currently a Work in Progress (WIP) and has not been released to [npm](https://www.npmjs.com/) yet.**

Please note that the API and features are subject to change, and the codebase may contain unfinished or unstable functionality. We recommend not using this library in production environments until an official release has been published.

Stay tuned for updates, and feel free to contribute or provide feedback as development continues!


## Setup

```js
import esbuild from 'esbuild'
import { SwaggerSpecParser } from 'esbuild-plugin-swagger-spec-parser'

await esbuild.build({
  /* all of your config */,
  plugins: [
    SwaggerSpecParser,
  ]
})
```

## Usage
The entrypoint files for swagger specification must be named with `swagger.(ya?ml|json)` as suffix. e.g. `openapi.swagger.yaml`, or `openapi.swagger.json`. 

This allows the plugin to identify which files should be parsed. 

```js
const specs = require('./openapi.swagger.json')
const specsFromYaml = require('./openapi.swagger.yaml')

console.log(specs)         // Parsed to a JSON format 
console.log(specsFromYaml) // Parsed to a JSON format 
```

## License 
MIT License [link](./LICENSE).