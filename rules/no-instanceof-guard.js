'use strict';

module.exports = noInstanceofGuard;

function noInstanceofGuard(context) {
    return {
        'BinaryExpression': function bin(node) {
            if (node.operator === 'instanceof' &&
                (node.left && node.left.type === 'ThisExpression') &&
                (node.parent && node.parent.operator === '!')
            ) {
                context.report(
                    node, 'expected no instanceof guard in constructor'
                );
            }
        }
    };
}

module.exports.schema = [];
