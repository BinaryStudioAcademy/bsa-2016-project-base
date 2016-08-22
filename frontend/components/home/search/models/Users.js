import MultiSelectModel from "./MultiSelectModel"
import searchService from "./../../../../services/SearchService"

export default class Users extends MultiSelectModel{
    constructor({container}) {
        super({
            title:"Users",
            values:[],
            custom:"",
            tips:[],
            container
        })
    }
    getNameInRequest(){
        return "users"
    }
    getTips(value,callback){
        searchService.getUsers(value)
            .then(res=>{callback(res.err,
                (res.tips||[]).map(tip=>({
                    text:`${tip.login} ${tip.userName} ${tip.userSurname} ${tip.position}`
                })))})
    }
}