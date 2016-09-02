var util = require("util");
var unique = require("./arrayUnique")
function varsEquals(vars1,vars2){
    if (vars1.length != vars2.length){
        return false;
    }
    for (var i = 0; i < vars1.length; i+=1){
        if (vars1[i] != vars2[i]) {
            return false;
        }
    }
    return true;
}
module.exports = function(table){
    function varsValues(i){
        return table[i].vars;
    }
    function vars(i){
        return Object.keys(table[i].vars)
    }
    function suitable(i){
        var _vars = vars(i);
        var _varsValues = varsValues(i);
        for (var _i = 0; _i < table.length; _i+=1){
            if (_i==i || table[_i].value == 0)continue;
            var __vars = vars(_i),
                __varsValues = varsValues(_i),
                diffCount = 0,
                diffIndex;
            if (varsEquals(_vars, __vars)){
                for (var __i = 0; __i < _vars.length; __i += 1){
                    if (_varsValues[_vars[__i]] != __varsValues[_vars[__i]]){
                        diffCount+=1;
                        diffIndex = __i;
                        if (diffCount>1) break;
                    }
                }
                if (diffCount == 1){
                    delete table[i]["vars"][_vars[diffIndex]];
                    delete table[_i]["vars"][_vars[diffIndex]];
                    return suitable(i);
                }
            }
        }
    }
    //console.log(util.inspect(table,null));
    for (var i = 0; i < table.length; i+=1){
        if (table[i].value == 1)suitable(i);
    }
    //console.log(util.inspect(table,null));
    unique(table);
    //table =
    return table.filter(record=>record.value)
    //console.log(util.inspect(table,null));
    //return table;

};