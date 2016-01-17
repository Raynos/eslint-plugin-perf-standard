'use strict';

var console = require('console');
var RuleTester = require('eslint').RuleTester;

var noInstanceofGuard = require('../rules/no-instanceof-guard.js');
var noSelfInConstructor = require('../rules/no-self-in-constructor.js');
var checkFunctionInline = require('../rules/check-function-inline.js');
var noArrayIterators = require('../rules/no-array-iterators.js');

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

var smallSrc = 'var foo = "' + buildStr(290) + '";';
var largeSrc = 'var foo = "' + buildStr(580) + '";';

ruleTester.run('check-function-inline', checkFunctionInline, {
    valid: [
        [
            'function foo() {',
            '    ' + smallSrc,
            '}'
        ].join('\n')
    ],
    invalid: [{
        code: [
            'function foo() {',
            '    ' + largeSrc,
            '}'
        ].join('\n'),
        errors: [{
            message: 'Function exceeds default limit by 16 characters'
        }]
    }, {
        code: [
            'function foo() {',
            '    // ' + smallSrc,
            '    ' + smallSrc,
            '}'
        ].join('\n'),
        errors: [{
            message: 'Function exceeds default limit by 37 characters'
        }]
    }]
});

ruleTester.run('no-self-in-constructor', noSelfInConstructor, {
    valid: [
        [
            'function Foo() {',
            '    this.foo = "bar";',
            '}'
        ].join('\n'),
        [
            'Foo.prototype.foo = function foo() {',
            '    var self = this;',
            '    self.bar = "bar";',
            '};'
        ].join('\n')
    ],
    invalid: [{
        code: [
            'function Foo() {',
            '    var self = this;',
            '    self.foo = "bar";',
            '}'
        ].join('\n'),
        errors: [{
            message: 'expected no self.foo = bar in constructor Foo'
        }]
    }, {
        code: [
            'module.exports = function Foo() {',
            '    var self = this;',
            '    self.foo = "bar";',
            '};'
        ].join('\n'),
        errors: [{
            message: 'expected no self.foo = bar in constructor Foo'
        }]
    }]
});

ruleTester.run('no-array-iterators', noArrayIterators, {
    valid: [
        [
            'var arr = [1,2,3];',
            'var result = [];',
            'for (var i = 0; i < arr.length; i++) {',
            '    result.push(arr[i] * 2);',
            '}'
        ].join('\n'),
        [
            'var foo = new Foo()',
            'foo.filter(42)'
        ].join('\n')
    ],
    invalid: [{
        code: [
            'var arr = [1,2,3];',
            'var result = arr.map(function pig(x) {',
            '    return x * 2;',
            '});'
        ].join('\n'),
        errors: [{
            message: 'no array iterators allowed'
        }]
    }, {
        code: [
            'var arr = [1,2,3];',
            'var result = arr.map(pig);'
        ].join('\n'),
        errors: [{
            message: 'no array iterators allowed'
        }]
    }]
});

/*eslint no-console: 0*/
console.log('ok');

function buildStr(len) {
    var chars = [];

    for (var i = 0; i < len; i++) {
        chars[i] = 'a';
    }

    return chars.join('');
}
