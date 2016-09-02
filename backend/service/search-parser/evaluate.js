const Token = require("./Token");
const Node = require("./Node");
const letters = require("./letters");
const unique = require("./arrayUnique");
function isName(value) {
    if ("string" !== typeof value) {
        return false;
    }
    for (let i = 0; i < value.length; i += 1) {
        if (letters.indexOf(value[i]) < 0) {
            return false;
        }
    }
    return true;
}

function vars(node) {
    if (!node) {
        return [];
    }
    if (isName(node.value)) {
        return [node.value]
    }
    if (node.value instanceof Node) {
        return vars(node.value)
    }

    return unique(vars(node.left)
        .concat(vars(node.right))
        .concat(vars(node.child)));

}
function _evaluate(node, varsValues) {
    if ("number" === typeof node.value) {
        return node.value;
    }
    if (node.value instanceof Node) {
        return _evaluate(node.value, varsValues);
    }
    if (node.child) {
        const value = _evaluate(node.child, varsValues);
        switch (node.value) {
            case Token.NOT:
                return value ? 0 : 1;
            default:
                throw new Error("Unknown operator " + value)
        }
    }
    if (node.left) {
        const left = _evaluate(node.left, varsValues);
        const right = _evaluate(node.right, varsValues);
        switch (node.value) {
            case Token.DIS:
                return left || right;
            case Token.CON:
                return left && right;
            case Token.IMPL:
                if (!left) return 1;
                return right;
            case Token.MOD2:
                if (left && right || !left && !right) return 0;
                return 1;
            default:
                throw new Error("Unknown operator " + node.value);
        }
    }
    if ("string" === typeof node.value) {
        const value = varsValues[node.value];
        if (value === undefined) throw new Error("Unknown variable");
        return value;
    }
}
function varsValues(vars, values) {
    const res = {};
    for (let i = 0; i < vars.length; i += 1) {
        res[vars[i]] = values[i] || 0;
    }
    return res;
}

function evaluate(node) {
    const _vars = vars(node);
    const res = [];
    for (let i = 0; i < Math.pow(2, _vars.length); i += 1) {
        const _values = i.toString(2).split("").map(v=>Number.parseInt(v)).reverse();
        const _varsValues = varsValues(_vars, _values);
        res.push({vars: _varsValues, value: _evaluate(node, _varsValues)})
    }
    return res;
}
module.exports = evaluate;