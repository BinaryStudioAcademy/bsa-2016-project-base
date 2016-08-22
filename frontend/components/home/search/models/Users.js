import MultiSelectModel from "./MultiSelectModel"

export default class Users extends MultiSelectModel{
    constructor({container}) {
        super({
            title:"Users",
            values:[{text:"u1"},{text:"u2"}],
            custom:"us",
            tips:[{text:"tipu1"}, {text:"tipu2"}],
            container
        })
    }
    getNameInRequest(){
        return "users"
    }
}