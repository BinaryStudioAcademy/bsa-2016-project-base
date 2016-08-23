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
                    name:tip.name,
                    surname:tip.surname,
                    position:tip.position,
                    avatarUrl:tip.avatar
                })))})
    }
    getText(value){
        return `${value.login}
                     ${value.userName}
                      ${value.userSurname}
                       ${value.position}`
    }//TODO:override
}