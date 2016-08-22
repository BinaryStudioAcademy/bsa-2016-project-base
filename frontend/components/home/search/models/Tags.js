import MultiSelectModel from "./MultiSelectModel"

export default class Tags extends  MultiSelectModel{
    constructor({container}) {
        super({
            title:"Tags",
            values:[{text:"t1"},{text:"t2"}],
            custom:"tag",
            tips:[{text:"tip1"}, {text:"tip2"}],
            container
        })
    }
    getNameInRequest(){
        return "tags"
    }
}