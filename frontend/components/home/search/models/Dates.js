import Model from "./Model"
import React from "react"
import {Tabs, Tab} from 'material-ui/Tabs';
import DateSelect from "./../components/RangeDateSelect"
export default class Dates extends Model{
    constructor({component}) {
        super({
            title:"Dates",
            values:[],
            custom:{},
            component
        });
        this.addValue = this.addValue.bind(this);
        this.getText = this.getText.bind(this)
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

    getView(){
        return <Tab key={this.number} value={this.number}
                    label={`${this.title} (${this.values.length})`}>
            <div><DateSelect model={this}/></div>
        </Tab>
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
    getNameInRequest(){return "dates"}
    getValueInRequest(){
        return this.values.map(date=>({
            from: date.lower.getTime(),
            to:date.upper.getTime()
        }))
    }
    getRequestRepresentation(){
        const from = [],
              to = [];
        const dateString = function(date){
            const year = date.getUTCFullYear(),
                month = date.getUTCMonth()+1,
                day = date.getUTCDate()+1;
            return `${year}-${month}-${day}`
        };
        this.values.map(date=>{
            from.push(dateString(date.lower));
            to.push(dateString(date.upper));
        });
        if (from.length){
            return `dateFrom=${from.join(",")}&dateTo=${to.join(",")}`
        }
        /*const date = this.values[0];
        if (date && this.isFilled(date)){

            return `dateFrom=${dateString(date.lower)}&dateTo=${dateString(date.upper)}`
        }*/
    }
    clear(){
        this.values = [];
        this.custom = {};
    }
}