
import compile from "./compile";
//const util = require('util');

function print(s){
    console.log(JSON.stringify(s,null,2));
    //console.log(util.inspect(s,{depth:null}))
}
print(compile("!(!A&!B)"));
print(compile("!A"));
print(compile("A|B&(C->!A)"));
print(compile("A+B+C"));
print(compile("(A"));
