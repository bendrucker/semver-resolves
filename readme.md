# semver-resolves [![Build Status](https://travis-ci.org/bendrucker/semver-resolves.svg?branch=master)](https://travis-ci.org/bendrucker/semver-resolves) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/semver-resolves.svg)](https://greenkeeper.io/)

> Test whether a semver range can possibly be satisfied

## Install

```
$ npm install --save semver-resolves
```


## Usage

```js
var resolves = require('semver-resolves')
resolves.range('>2 <4') // => true
resolves.range('<2 >4') // => false
```

semver-resolves determines whether the given range can be satisfied by at least one valid version.

## API

#### `resolves.range(range)` -> `boolean`

##### range

*Required*  
Type: `string`

The semver range to test.

#### `resolves.comparators(comparators)` -> `boolean`

##### comparators

*Required*  
Type: `array[comparator]`

An array of `semver.Comparator` instances to check.

`resolves.range` will allow any range with at least one comparator set that resolves. You can use `resolves.comparator` to check individual sets independently.

## License

MIT © [Ben Drucker](http://bendrucker.me)
