import Model from "./Model"
import React from "react"
import {Tabs, Tab} from 'material-ui/Tabs';
import DateSelect from "./../components/RangeDateSelect"
export default class Dates extends Model{
    constructor({container}) {
        super({
            title:"Dates",
            values:[],
            custom:{},
            container
        });
        this.addValue = this.addValue.bind(this);
        this.getText = this.getText.bind(this)
    }
    getText(value){
        return value.lower.toLocaleDateString()+
            " - "+
            value.upper.toLocaleDateString()
    }
    swapDates(){
        const temp = this.custom.lower;
        this.custom.lower = this.custom.upper;
        this.custom.upper = temp;
    }
    isFilled(){
        return this.custom.upper && this.custom.lower;
    }
    isValid(){
        return this.custom.upper.getTime() >
            this.custom.lower.getTime()
    }
    setUpper(upper){
        this.custom.upper = upper;
        if (this.isFilled() && !this.isValid()){
            this.swapDates()
        }
        this.notifyUpdated()
    }
    setLower(lower){
        this.custom.lower = lower;
        if (this.isFilled() && !this.isValid()){
            this.swapDates()
        }
        this.notifyUpdated()
    }

    getView(){
        return <Tab key={this.number} value={this.number}
                    label={`${this.title} (${this.values.length})`}>
            <DateSelect
                model={this}/>
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
    getNameInRequest(){
        return "dates"
    }
    getValueInRequest(){
        return this.values.map(date=>({
            from: date.lower.getTime(),
            to:date.upper.getTime()
        }))
    }
}