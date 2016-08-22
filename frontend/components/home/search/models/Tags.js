import MultiSelectModel from "./MultiSelectModel"
import searchService from "./../../../../services/SearchService"
export default class Tags extends  MultiSelectModel{
    constructor({container}) {
        super({
            title:"Tags",
            values:[],
            custom:"",
            tips:[],
            container
        })
    }
    getNameInRequest(){
        return "tags"
    }
    getTips(value,callback){
        searchService.getTags(value)
            .then(res=>{callback(res.err,(res.tips||[]).map(tip=>(
                {text:tip.tagName}
            )))})
    }
}