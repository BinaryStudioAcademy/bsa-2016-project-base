import MultiSelectModel from "./MultiSelectModel"
export default class Tags extends  MultiSelectModel{
    constructor({component}) {
        super({
            title:"Tags",
            values:[],
            custom:"",
            tips:[],
            component
        });
        this.customHintText = "Type tag name for search"
    }
    getNameInRequest(){
        return "tags"
    }
    getTips(value,callback){
        this.searchService.getTags(value)
            .then(res=>{callback(res.err,(res.tips||[]).map(tip=>(
                {text:tip.tagName}
            )))})
    }
}