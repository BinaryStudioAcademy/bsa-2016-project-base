import React from "react"
import {PropTypes} from "react"
import DatePicker from 'material-ui/DatePicker';
import DeletableList from "./../../DeletableList"
import RaisedButton from 'material-ui/RaisedButton';
import DateModel from "./DatesModel"
import Modelable from "./../Modelable"
export default class RangeDateSelect extends Modelable {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(DateModel)
        }
    }
    /**
     *
     * @param what {"lower"|"upper"}
     *
     * @param event unneeded
     * @param date {Date}
     */
    handleDateChanged(what, event, date){
        const {model} = this.props;
        if (what == "lower"){
            model.setLower(date)
        }
        if (what == "upper"){
            model.setUpper(date)
        }
    }

    render() {
        const {model} = this.props;
        const {values, custom} = model;
        const {upper, lower} = custom;

        const upperDatePicker = <DatePicker
            autoOk={true}
            floatingLabelText="To"
            value={upper}
            onChange={this.handleDateChanged.bind(this, "upper")}
        />;

        const lowerDatePicker = <DatePicker
            autoOk={true}
            floatingLabelText="From"
            value={lower}
            onChange={this.handleDateChanged.bind(this, "lower")}
        />;


        return (<div style={{display:"flex"}}>
            <div style={{width:"40%"}}>
                {lowerDatePicker}
                {upperDatePicker}
                <RaisedButton label="Add Interval"
                              onClick={model.addValue}/>
            </div>
            <div style={{width:"60%"}}>
                <DeletableList
                    model={model}
                />
            </div>
        </div>)
    }
}