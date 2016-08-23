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
    getTips(value,callback){
        searchService.getUsers(value)
            .then(res=>{callback(res.err,
                (res.tips||[]).map(tip=>({
                    text:`${tip.login}
                     ${tip.userName}
                      ${tip.userSurname}
                       ${tip.position}`,
                    avatarUrl:tip.avatar
                })))})
    }
    //getText(value){}//TODO:override
}