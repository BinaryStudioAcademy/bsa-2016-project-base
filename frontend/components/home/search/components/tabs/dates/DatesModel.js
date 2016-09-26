import Model from "./../Model"
import DateSelect from "./RangeDateSelectComponent"
export default class Dates extends Model{
    constructor({component}) {
        super({
            title:"Dates",
            values:[],
            custom:{},
            component
        });
        this.addValue = this.addValue.bind(this);
        this.getText = this.getText.bind(this);
        this.ComponentClass = DateSelect;
    }
    getText(value){
        return value.lower.toLocaleDateString()+
            " - "+
            value.upper.toLocaleDateString()
    }
    swapDates(value = this.custom){
        const temp = value.lower;
        value.lower = value.upper;
        value.upper = temp;
    }
    isFilled(value = this.custom){
        return value.upper && value.lower;
    }
    isValid(value = this.custom){
        return value.upper.getTime() >
            value.lower.getTime()
    }
    setUpper(upper){
        this.custom.upper = upper;
        if (this.isFilled(this.custom) && !this.isValid(this.custom)){
            this.swapDates(this.custom)
        }
        this.notifyUpdated()
    }
    setLower(lower){
        this.custom.lower = lower;
        if (this.isFilled(this.custom) && !this.isValid(this.custom)){
            this.swapDates(this.custom)
        }
        this.notifyUpdated()
    }

    addValue(){
        if (this.isFilled()){
            const custom = this.custom;
            this.custom = {};
            super.addValue(custom)
        }
    }
    equals(one, two){
        return one.lower.getTime() == two.lower.getTime() &&
                one.upper.getTime() == two.upper.getTime()
    }
    getRequestRepresentation(){
        const from = [],
              to = [];
        const dateString = function(date){
            const year = date.getUTCFullYear(),
                month = date.getMonth()+1,
                day = date.getDate();
            return `${year}-${month}-${day}`
        };
        this.values.map(date=>{
            from.push(dateString(date.lower));
            to.push(dateString(date.upper));
        });
        if (from.length){
            return `dateFrom=${from.join(",")}&dateTo=${to.join(",")}`
        }
        /*const dates = this.values[0];
        if (dates && this.isFilled(dates)){

            return `dateFrom=${dateString(dates.lower)}&dateTo=${dateString(dates.upper)}`
        }*/
    }
    clear(){
        this.values = [];
        this.custom = {};
    }
}