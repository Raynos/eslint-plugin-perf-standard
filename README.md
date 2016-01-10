# eslint-plugin-perf-standard

<!--
    [![build status][build-png]][build]
    [![Coverage Status][cover-png]][cover]
    [![Davis Dependency status][dep-png]][dep]
-->

<!-- [![NPM][npm-png]][npm] -->

A set of custom plugins to enforce high performance JS

## Example

```js
{
    "rules": {
        "perf-standard/no-instanceof-guard": 2,
        "perf-standard/no-self-in-constructor": 2,
        "perf-standard/check-function-inline": 1
    }
}
```

Currently the plugins we have are:

### `no-instanceof-gaurd`

This disables the common anti-pattern of:

```js
function Foo() {
  if (!(this instanceof Foo)) return new Foo()
}
```

### `no-self-in-constructor`

This disables the ability to use `var self = this` in
the body of a constructor function.

For performance reasons we should use `this.foo = bar;` in
constructors.

Using `var self = this` in methods is fine.

### `check-function-inline`

This lint rule checks to see if a function is between 600
and 660 characters and then warns that the function will not
be inlined in V8.

## Installation

`npm install eslint-plugin-perf-standard`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licensed

  [build-png]: https://secure.travis-ci.org/Raynos/eslint-plugin-perf-standard.png
  [build]: https://travis-ci.org/Raynos/eslint-plugin-perf-standard
  [cover-png]: https://coveralls.io/repos/Raynos/eslint-plugin-perf-standard/badge.png
  [cover]: https://coveralls.io/r/Raynos/eslint-plugin-perf-standard
  [dep-png]: https://david-dm.org/Raynos/eslint-plugin-perf-standard.png
  [dep]: https://david-dm.org/Raynos/eslint-plugin-perf-standard
  [npm-png]: https://nodei.co/npm/eslint-plugin-perf-standard.png?stars&downloads
  [npm]: https://nodei.co/npm/eslint-plugin-perf-standard
