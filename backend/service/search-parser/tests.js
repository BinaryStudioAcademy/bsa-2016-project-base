
const compile = require("./compile");
const util = require('util');

function print(s){
    console.log(util.inspect(s,{depth:null}))
}
//print(compile("!(!A&!B)"));
//print(compile("!A"));
print(compile("tag1|tag0&(tech0->!tag1)"));
//print(compile("A+B+C"));
//print(compile("tag0 & (tag1 + !tech0)"));