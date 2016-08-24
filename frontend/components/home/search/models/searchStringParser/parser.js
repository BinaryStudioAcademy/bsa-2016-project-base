/**
 * Created by user on 24.08.2016.
 */
const symbols = {
    '#': 'tags',
    '@': 'users',
    '!': 'techs',
    '~': 'owners',
    '^': 'name'
};
const SPACE = " ";

export default/*module.exports =*/ function(_string){
    let result = [];
    let pair = {};
    let string = "";
    let _i = 0;
    function nextToken(){
        token = string[_i++];
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
            nextToken();
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
};

