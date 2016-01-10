'use strict';

var noInstanceofGuard = require('./rules/no-instanceof-guard.js');
var checkFunctionInline = require('./rules/check-function-inline.js');

module.exports = {
    rules: {
        'no-instanceof-guard': noInstanceofGuard,
        'check-function-inline': checkFunctionInline
    },
    rulesConfig: {
        'no-instanceof-guard': 2,
        'check-function-inline': [1, {
            maxCharacters: 660
        }]
    }
};
