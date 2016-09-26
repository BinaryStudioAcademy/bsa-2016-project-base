const evaluate = require("./evaluate")
const parse = require("./parse");
const optimize = require("./optimizeEvaluated")
module.exports = function(string){
    return {
        input:string,
        result:optimize(evaluate(parse(string)))
    };
};