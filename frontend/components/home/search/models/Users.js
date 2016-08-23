import MultiSelectModel from "./MultiSelectModel"
import searchService from "./../../../../services/SearchService"
import UsersClass from "./../components/Users"
export default class Users extends MultiSelectModel{
    constructor({component}) {
        super({
            title:"Users",
            values:[],
            custom:"",
            tips:[],
            component
        });
        this.ComponentClass = UsersClass;
    }
    getNameInRequest(){
        return "users"
    }
    getValueInRequest(){
        return this.values.map(value=>value.name)
    }
    getTips(value,callback){
        searchService.getUsers(value)
            .then(res=>{callback(res.err,
                (res.tips||[]).map(tip=>({
                    login:tip.login,
                    name:tip.userName,
                    surname:tip.userSurname,
                    position:tip.position,
                    avatarUrl:tip.avatar
                })))})
    }
    getText(value){
        debugger
        return `${value.login}
                     ${value.name}
                      ${value.surname}
                       ${value.position}`
    }//TODO:override
}