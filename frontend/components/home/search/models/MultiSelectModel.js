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
        this.ComponentClass = MultiSelect;
    }
    getView(){
        return <Tab key={this.number} value={this.number}
                    label={`${this.title} (${this.values.length})`}>
            {React.createElement(this.ComponentClass, {
                model: this
            })}
        </Tab>;
    }
    getText(value){
        return value.text;
    }
    getTips(value,callback){}

    startLoadTips(){
        this.isLoading = true;
        this.notifyUpdated();
        this.getTips(this.custom, function(error, tips){
            this.tipsError = error&&""
            this.tips = tips.filter(tip=>{
                for (let value of this.values){
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
    setCustom(value){
        this.custom = value.trim();
        //this.notifyUpdated();
        clearTimeout(this.tipsTimeout);
        this.tipsTimeout = setTimeout(()=>{
            if (this.custom.length>0){
                this.startLoadTips()
            }else {
                this.tips = [];
                this.notifyUpdated()
            }
        }, 500);

    }

    addValue(value){
        this.tips = this.tips.filter(tip=>!this.equals(tip,value))
        super.addValue(value);
    }
    equals(one,two){
        return this.getText(one) == this.getText(two);
    }

    getValueInRequest(){
        return this.values.map(value=>value.text)
    }
    clear(){
        this.tips = [];
        this.values = [];
        this.custom = "";
    }

}