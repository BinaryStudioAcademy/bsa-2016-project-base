import React from "react"
import {PropTypes} from "react"
import DatePicker from 'material-ui/DatePicker';
import DeletableList from "./DeletableList"
import RaisedButton from 'material-ui/RaisedButton';

export default class RangeDateSelect extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            /**
             * {upper:Date,
             *  lower:Date}
             */
            data:PropTypes.object.isRequired,
            /**
             * @param {{upper,lower}}newValues
             */
            receiver:PropTypes.func.isRequired
        }
    }

    /**
     *
     * @param value {{upper,lower}}
     */
    swapDates(value){
        const temp = value.lower;
        value.lower = value.upper;
        value.upper = temp;
    }

    /**
     *
     * @param value {{upper,lower}}
     */
    isFilled(value){
        return value.upper && value.lower;
    }

    /**
     *
     * @param value {{upper,lower}}
     */
    isValid(value){
        return value.upper.getTime() > value.lower.getTime()
    }

    /**
     *
     * @param what {"lower"|"upper"}
     *
     * @param event unneeded
     * @param date {Date}
     */
    handleDateChanged(what, event, date){
        const {receiver, data} = this.props;
        const {custom} = data;

        custom[what] = date;

        if (this.isFilled(custom) && !this.isValid(custom)){

            this.swapDates(custom);
        }

        receiver(data)
    }

    render() {
        const {receiver, data} = this.props;
        const {values, custom} = data;
        const {upper, lower} = custom;

        const upperDatePicker = <DatePicker
            autoOk={true}
            floatingLabelText="To"
            value={upper}
            onChange={this.handleDateChanged.bind(this, "upper")}
        />;

        const lowerDatePocker = <DatePicker
            autoOk={true}
            floatingLabelText="From"
            value={lower}
            onChange={this.handleDateChanged.bind(this, "lower")}
        />;

        const addInterval = ()=>{
            if (data.custom.upper && data.custom.lower){
                data.selected = data.custom;
                data.custom = {};
                receiver(data);
            }

        };

        return (<div style={{display:"flex"}}>
            <div style={{width:"40%"}}>
                {lowerDatePocker}
                {upperDatePicker}
                <RaisedButton label="Add Interval" onClick={addInterval}/>
            </div>
            <div style={{width:"60%"}}>
                <DeletableList
                    data={data}
                    receiver={receiver}
                    getText={value=>{
                        return value.lower.toLocaleDateString()+
                                " - "+
                                value.upper.toLocaleDateString()
                    }}
                />
            </div>
        </div>)
    }
}