import Updatable from "./../../models/Updatable"
var counter = 0;
export default class Model extends Updatable{
    constructor({title,values,custom,tips,component}) {
        super(component);
        this.number = counter++;
        this.title = title;
        this.values = values;
        this.custom = custom;
        this.tips = tips;
    }
    getNameInRequest(){}
    getView(){}
    getValueInRequest(){}
    getRequestRepresentation(){
        const values = this.getValueInRequest();
        if (values.length){
            return `${this.getNameInRequest()}=${values.join(",")}`

        }
    }
    getText(value){}
    equals(other){}
    addValue(value){
        this.values.push(value);
        this.notifyUpdated();
    }
    removeValue(value){
        this.values = this.values.filter(elem=>!this.equals(elem,value))
        this.notifyUpdated()
    }

}