# Esbuild Swagger Specifications Parser Plugin

[![npm version](https://badge.fury.io/js/esbuild-plugin-swagger-spec-parser.svg?cacheBuster=1)](https://www.npmjs.com/package/esbuild-plugin-swagger-spec-parser)

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

The entrypoint files for swagger specification must be named with `swagger.(ya?ml|json)` as suffix. e.g. `openapi.swagger.yaml`, or `openapi.swagger.json`.

This allows the plugin to identify which files should be parsed.

```js
const specs = require("./openapi.swagger.json");
const specsFromYaml = require("./openapi.swagger.yaml");

console.log(specs); // Parsed to a JSON format
console.log(specsFromYaml); // Parsed to a JSON format
```

## Typescript

When working with typescript, you might want to specify the type declarations of the swagger spec file you're importing.

You can currently do that be specifying the reference to the node_module ambient declarations of the plugin.

```js
/// <reference path="../node_modules/esbuild-plugin-swagger-spec-parser/dist/custom.d.ts" />
const specs = require("./openapi.swagger.yaml");

console.log(specs); // Parsed to a JSON format
```

## License

MIT License [link](./LICENSE).
