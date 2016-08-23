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
    swapDates(value){
        const temp = value.lower;
        value.lower = value.upper;
        value.upper = temp;
    }
    isFilled(value){
        return value.upper && value.lower;
    }
    isValid(value){
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
            <DateSelect model={this}/>
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
        const date = this.values[0];
        if (date && this.isFilled(date)){
            const dateString = function(date){
                const year = date.getYear(),
                    month = date.getMonth(),
                    day = date.getDay();
                return `${year}-${month}-${day}`
            };
            return `dateFrom=${dateString(date.lower)}&dateTo=${dateString(date.upper)}`
        }
    }
}