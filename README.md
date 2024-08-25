# Esbuild Swagger Specifications Parser Plugin 

An esbuild plugin that parses the Swagger specs (YAML and JSON). 

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
The entrypoint files for swagger specification must be named with the prefix `swagger.(ya?ml|json)` e.g. `openapi.swagger.yaml`, or `openapi.swagger.json`. 

This allows the plugin to identify which files should be parsed. 

```js
const specs = require('./openapi.swagger.json')
const specsFromYaml = require('./openapi.swagger.yaml')

console.log(specs)         // Parsed to a JSON format 
console.log(specsFromYaml) // Parsed to a JSON format 
```

## License 
MIT License [link](./LICENSE).