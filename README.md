# `iota-url-parser`

[![iota-url-parser](https://img.shields.io/badge/iota--url--parser-v0.0.2-informational)](https://github.com/maxwellmattryan/iota-url-parser)
[![downloads](https://img.shields.io/npm/dm/iota-url-parser)](https://npmjs.com/package/iota-url-parser)
[![CI](https://github.com/maxwellmattryan/iota-url-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/maxwellmattryan/iota-url-parser/actions/workflows/ci.yml)

A module that supports parsing and building of IOTA deep links.

## Getting Started

```bash
# NPM
npm install iota-url-parser

# Yarn
yarn install iota-url-parser
```

## Using the Library

The library contains two functions:

### `parse(uri)`

Parses an IOTA deep link for its various properties, namely
protocol, context, operation, and any specific arguments or parameters.

```typescript
import { parse } from 'iota-url-parser'

const parseResult = parse('iota://wallet/send/atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5?amount=51&unit=Gi')
console.log(parseResult)
// {
//     protocol: 'iota',
//     context: 'wallet',
//     operation: 'send',
//     argument: 'atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5',
//     parameters: { amount: 51, unit: 'Gi' }
// }
```

### `build(protocol, context, operation, argument, parameters)`

Assemble an IOTA deep link URL given a few parameters.

```typescript
import { build } from 'iota-url-parser'

const buildResult = build(
    'iota',
    'wallet', 
    'send', 
    'atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5', 
    { amount: 51, unit: 'Gi' }
)
console.log(buildResult)
// iota://wallet/send/atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5?amount=51&unit=Gi
```
