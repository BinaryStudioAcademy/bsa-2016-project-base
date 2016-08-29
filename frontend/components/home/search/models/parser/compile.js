import evaluate from "./evaluate"
import parse from "./parse";

export default  function(string){
    return {
        input:string,
        result:evaluate(parse(string))
    };
};