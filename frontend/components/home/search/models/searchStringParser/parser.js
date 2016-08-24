/**
 * Created by user on 24.08.2016.
 */
const symbols = {
    '#': 'tags',
    '@': 'users',
    '!': 'techs',
    '~': 'owners',
    //'^': 'name',
    EMPTY:'name'
};
const SPACE = " ";

export default _parser;
//module.exports =
function _parser(_string){
    let result = [];
    let pair = {};
    let string = "";
    let _i = 0;
    function nextToken(){
        token = string[_i++];
    }
    function previousToken(){
        token = string[--_i];
    }
    let token;
    return parser(_string);

    function parser(_string){

        //удаление повторяющихся пробелов
        string = _string.split("").filter((token,i,arr)=>{
            return !(token === SPACE && arr[i - 1] === SPACE);
        }).join("");
        nextToken();
        name(string);
        same();
        return result;
    }

    function name(){
        while (token){
            if (symbols.hasOwnProperty(token)){
                pair.name=symbols[token];
                return value()
            }
            else {
                pair.name=symbols.EMPTY;
                previousToken();
                return value();
            }
        }
    }

    function value(){
        let i = _i;
        while (token){
            if (token === SPACE){
                break;
            }
            nextToken();
        }
        pair.value=string.slice(i,_i-1);
        result.push(pair);
        pair = {};
        nextToken();
        return name()
    }
    function same(){
        let _result = {};
        for (let i in result){
            let name = result[i].name;
            _result[name]?_result[name].push(result[i].value):_result[name] = [result[i].value];
        }
        let __result = [];
        for (let prop in _result){
            __result.push(prop+"="+_result[prop].join(","));
        }
        result = __result;
    }
}
//////////////////////////////////////////////////////////////////////////////////
//TESTS///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
var s1 = _parser("#tag !tecsdf dfs");
var s2 = _parser("@user erwer");
var s3 = _parser("!t");
var s4 = _parser("#Albanian q");
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
if (!s1.equals([ 'tags=tag', 'techs=tecsdf', 'name=dfs' ]) ||
    !s2.equals([ 'users=user', 'name=erwer' ])||
    !s3.equals([ 'techs=t' ])||
    !s4.equals([ 'tags=Albanian', 'name=q' ])){

    alert("Search string parser d'ont working!");
    throw new Error("Search string parser d'ont working!")
}
/*console.log(s1);
console.log(s2);
console.log(s3);
console.log(s4); */
delete Array.prototype.equals;
