import Updatable from "./../../../models/Updatable"
import {Tab} from 'material-ui/Tabs';
var counter = 0;
import React from "react"
export default class Model extends Updatable{
    constructor({title,values,custom,tips,component}) {
        super(component);
        this.number = counter++;
        this.title = title;
        this.values = values;
        this.custom = custom;
        this.tips = tips;
    }
    getView(){
        return <Tab key={this.number} value={this.number}
                    label={`${this.title} (${this.values.length})`}>
            <div>{React.createElement(this.ComponentClass, {
                model: this
            })}</div>
        </Tab>;
    }
    getTitleInSingular(){
        return this.title.substr(0,this.title.length-1);
    }
    getNameInRequest(){}
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
    //should clear all state
    clear(){}

}