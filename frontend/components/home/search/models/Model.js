
var counter = 0;
export default class Model {
    constructor({title,values,custom,tips,container}) {
        this.number = ++counter;
        this.title = title;
        this.values = values;
        this.custom = custom;
        this.tips = tips;
        this.container = container;
    }
    getNameInRequest(){}
    getView(){}
    getValueInRequest(){}
    getText(value){}
    equals(other){}

    notifyUpdated(){
        this.container.forceUpdate();
    }

    addValue(value){
        this.values.push(value);
        this.notifyUpdated();
    }
    removeValue(value){
        this.values = this.values.filter(elem=>!this.equals(elem,value))
        this.notifyUpdated()
    }

}