'use strict';

var DEFAULT_MIN_CHARACTERS = 600;
var CONSIDERED_MAX_CHARACTERS = 660;

module.exports = checkFunctionInline;

function checkFunctionInline(context) {
    var maxChar = context.options[0] && context.options[0].maxCharacters;
    maxChar = maxChar || CONSIDERED_MAX_CHARACTERS;

    return {
        'FunctionDeclaration': function checkDec(node) {
            checkInlineAbility(node);
        },
        'FunctionExpression': function checkExpr(node) {
            checkInlineAbility(node);
        }
    };

    function checkInlineAbility(node) {
        var sourceLength = context.getSourceCode().getText(node).length;
        if (sourceLength > DEFAULT_MIN_CHARACTERS &&
            sourceLength < maxChar
        ) {
            var message = 'Function exceeds default limit by ' +
                (sourceLength - DEFAULT_MIN_CHARACTERS) + ' characters';
            context.report(node, message);
        }
    }
}

module.exports.schema = [{
    'type': 'object',
    'properties': {
        'maxCharacters': {
            'type': 'string'
        }
    },
    'additionalProperties': false
}];
