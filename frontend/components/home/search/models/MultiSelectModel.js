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
        this.component = <Tab key={this.number} value={this.number}
                   label={`${this.title} (${this.values.length})`}>
            <MultiSelect
                model={this}/>
        </Tab>;
        return this.component;
    }
    getText(value){
        return value.text;
    }
    getTips(value,callback){}

    setCustom(value){
        this.custom = value;
        this.notifyUpdated();
        clearTimeout(this.tipsTimeout);
        this.tipsTimeout = setTimeout(()=>{
            if (value.length > 0){
                this.isLoading = true;
                this.notifyUpdated();
                this.getTips(value, function(error, tips){
                    this.tipsError = error&&error.message;
                    this.tips = tips.filter(tip=>{
                        for (value of this.values){
                            if (this.equals(value,tip)){
                                return false;
                            }
                        }
                        return true;
                    });
                    this.isLoading = false;
                    this.notifyUpdated();
                }.bind(this))
            }
        }, 1000);

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