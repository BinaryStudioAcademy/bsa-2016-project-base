import Users from "./../users/UsersModel"
import UsersClass from "./../users/UsersComponent"
export default class Owners extends Users{
    constructor({component}) {
        super({
            title:"Owners",
            values:[],
            custom:"",
            tips:[],
            component
        });
        this.ComponentClass = UsersClass;
        this.customHintText = "Type owner name or surname"
    }
    getNameInRequest(){
        return "owners"
    }
}