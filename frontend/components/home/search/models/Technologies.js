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
        return "techs"
    }
    getTips(value,callback){
        searchService.getTechs(value)
            .then(res=>{callback(res.err,(res.tips||[]).map(tip=>({
                    name:tip.techName,
                    version:tip.techVersion
                })))})
    }
    getText(value){
        return `${value.name} : ${value.version}`
    }
    getValueInRequest(){
        return this.values.map(value=>value.name)
    }
}