'use strict';

var noInstanceofGuard = require('./rules/no-instanceof-guard.js');
var noSelfInConstructor = require('./rules/no-self-in-constructor.js');
var checkFunctionInline = require('./rules/check-function-inline.js');
var oneLineClosure = require('./rules/one-line-closure.js');

module.exports = {
    rules: {
        'no-instanceof-guard': noInstanceofGuard,
        'no-self-in-constructor': noSelfInConstructor,
        'check-function-inline': checkFunctionInline,
        'one-line-closure': oneLineClosure
    },
    rulesConfig: {
        'no-instanceof-guard': 2,
        'check-function-inline': [1, {
            maxCharacters: 660
        }],
        'no-self-in-constructor': 2,
        'one-line-closure': 2
    }
};
