'use strict';

var noInstanceofGuard = require('./rules/no-instanceof-guard.js');
var noSelfInConstructor = require('./rules/no-self-in-constructor.js');
var checkFunctionInline = require('./rules/check-function-inline.js');

module.exports = {
    rules: {
        'no-instanceof-guard': noInstanceofGuard,
        'no-self-in-constructor': noSelfInConstructor,
        'check-function-inline': checkFunctionInline
    },
    rulesConfig: {
        'no-instanceof-guard': 2,
        'check-function-inline': [1, {
            maxCharacters: 660
        }],
        'no-self-in-constructor': 2
    }
};
