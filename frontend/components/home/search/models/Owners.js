import Users from "./Users"
import UsersClass from "./../components/Users"
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