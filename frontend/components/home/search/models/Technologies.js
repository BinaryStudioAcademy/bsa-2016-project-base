import MultiSelectModel from "./MultiSelectModel"

export default class Technologies extends MultiSelectModel{
    constructor({container}) {
        super({
            title:"Technologies",
            values:[{text:"t1"},{text:"t2"}],
            custom:"tech",
            tips:[{text:"tip1"}, {text:"tip2"}],
            container
        })
    }
    getNameInRequest(){
        return "technologies"
    }
}