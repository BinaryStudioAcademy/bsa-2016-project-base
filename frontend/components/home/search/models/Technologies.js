import MultiSelectModel from "./MultiSelectModel"
import searchService from "./../../../../services/SearchService"

export default class Technologies extends MultiSelectModel{
    constructor({component}) {
        super({
            title:"Technologies",
            values:[],
            custom:"",
            tips:[],
            component
        })
    }
    getNameInRequest(){
        return "technologies"
    }
    getTips(value,callback){
        searchService.getTechs(value)
            .then(res=>{callback(res.err,(res.tips||[]).map(tip=>({
                    text:`${tip.techName} : ${tip.techVersion}`
                })))})
    }
    //getText(){}//TODO: override
}