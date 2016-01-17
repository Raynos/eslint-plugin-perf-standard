'use strict';

var bannedMethods = {
    'filter': true,
    'forEach': true,
    'some': true,
    'every': true,
    'map': true,
    'reduce': true,
    'reduceRight': true
};

module.exports = noArrayIterators;

function noArrayIterators(context) {
    return {
        'CallExpression': function call(node) {
            var callee = node.callee;
            if (callee.type !== 'MemberExpression') {
                return;
            }

            var methodName = callee.property.name;
            if (!bannedMethods[methodName]) {
                return;
            }

            var args = node.arguments;
            if (args.length === 0) {
                return;
            }

            var argType = args[0].type;
            if (argType !== 'FunctionExpression' &&
                argType !== 'Identifier'
            ) {
                return;
            }

            context.report(node, 'no array iterators allowed');
        }
    };
}

module.exports.schema = [];
