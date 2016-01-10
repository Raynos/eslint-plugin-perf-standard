'use strict';

var test = require('tape');

var eslintPluginPerfStandard = require('../index.js');

test('eslintPluginPerfStandard is a function', function t(assert) {
    assert.equal(typeof eslintPluginPerfStandard, 'function');
    assert.end();
});
