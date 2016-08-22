import Model from "./Model"
import {Tab} from 'material-ui/Tabs';
import MultiSelect  from "./../components/MultiSelect"
import React from "react"

export default class MultiSelectModel extends Model{
    constructor(params){
        super(params);
        this.addValue = this.addValue.bind(this);
        this.getText = this.getText.bind(this);
        this.setCustom = this.setCustom.bind(this);
    }
    getView(){
        return <Tab key={this.number} value={this.number}
                   label={`${this.title} (${this.values.length})`}>
            <MultiSelect
                model={this}/>
        </Tab>
    }
    getText(value){
        return value.text;
    }
    getTips(value,callback){
        this.isLoading = true;
        this.notifyUpdated();
        this.tips = [{text:value+"1"}, {text:value+"2"}];
        setTimeout(function(){
            this.isLoading = false;
            callback(null);
        }.bind(this), 1000);
    }
    setCustom(value){
        this.custom = value;
        this.getTips(value, function(err){
            this.notifyUpdated();
        }.bind(this))
    }

    addValue(value){
        this.tips = this.tips.filter(tip=>!this.equals(tip,value))
        super.addValue(value);
    }
    equals(one,two){
        return one.text == two.text;
    }

    getValueInRequest(){
        return this.values.map(value=>value.text)
    }
}