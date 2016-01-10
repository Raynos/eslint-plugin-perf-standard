'use strict';

var console = require('console');
var RuleTester = require('eslint').RuleTester;

var noInstanceofGuard = require('../rules/no-instanceof-guard.js');

var ruleTester = new RuleTester();

ruleTester.run('no-instanceof-gaurd', noInstanceofGuard, {
    valid: [
        [
            'function Foo() {',
            '    this.bar = "bar";',
            '}'
        ].join('\n')
    ],
    invalid: [{
        code: [
            'function Foo() {',
            '    if (!(this instanceof Foo)) return new Foo();',
            '    ',
            '    this.bar = "bar";',
            '}'
        ].join('\n'),
        errors: [{
            message: 'expected no instanceof gaurd in constructor'
        }]
    }]
});

/*eslint no-console: 0*/
console.log('ok');
