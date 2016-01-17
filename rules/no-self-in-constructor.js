'use strict';

var isUpperCaseLetter = /[A-Z]/;

module.exports = noSelfInConstructor;

function noSelfInConstructor(context) {
    return {
        'AssignmentExpression': function checkSelf(node) {
            if (!isAssignmentToSelf(node)) {
                return;
            }

            var parent = findParent(node, [
                'FunctionDeclaration',
                'FunctionExpression'
            ]);
            if (!parent) {
                return;
            }

            var name = parent.id.name;
            if (!isUpperCaseLetter.test(name[0])) {
                return;
            }

            var msg = 'expected no self.foo = bar in constructor ' + name;
            context.report(node, msg);
        }
    };
}

module.exports.schema = [];

function findParent(node, types) {
    var parent = node;
    var candidate = null;

    while (parent) {
        parent = parent.parent;

        if (types.indexOf(parent.type) >= 0) {
            candidate = parent;
            break;
        }
    }

    return candidate;
}

function isAssignmentToSelf(node) {
    return (node.left && node.left.type === 'MemberExpression') &&
        (node.left.object && node.left.object.name === 'self');
}
