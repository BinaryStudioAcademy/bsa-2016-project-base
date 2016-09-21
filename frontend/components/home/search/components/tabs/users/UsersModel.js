import MultiSelectModel from "./../MultiSelectModel"
import UsersClass from "./UsersComponent"
export default class Users extends MultiSelectModel{
    constructor({component,title}) {
        super({
            title:title||"Users",
            values:[],
            custom:"",
            tips:[],
            component
        });
        this.customHintText = "Type user name or surname";
        this.ComponentClass = UsersClass;
    }
    getNameInRequest(){
        return "users"
    }
    getValueInRequest(){
        return this.values.map(value=>{
            return value.name + " "+ value.surname;
        })
    }
    getTips(value,callback){
        this.searchService.getUsers(value)
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
        return `${value.name} ${value.surname} - ${value.position}`
    }//TODO:override
}