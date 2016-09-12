import React, { Component } from 'react';
import PieChartComp from "./PieChart"
import BarChartComp from "./BarChart"
import LineChartComp from "./LineChart"
import DoughnutChartComp from "./DoughnutChart"
import ChartStatistic from "./chartComponents/ChartStatistic"

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/ChartActions';

import styles from './stats.sass';



class Stats extends Component {
    constructor(props) {
        super(props);/*
        var self = this;
        var f = (arr,i)=>{
            if (!arr[i])i = 0;
            self.props.changeChartType(arr[i])
            self.props.loadData()
            setTimeout(f.bind(null, arr, i+1), 5000);
        }
        setTimeout(f.bind(null, ["Circle","Bar","Linear"], 0), 2000);*/
        this.state={selectAll:false}
    }

    getData() {
        return [{
                "name": "<5",
                "value": 2704659}, {
                "name": "5-13",
                "value": 4499890}, {
                "name": "14-17",
                "value": 2159981}, {
                "name": "18-24",
                "value": 3853788}, {
                "name": "25-44",
                "value": 14106543}, {
                "name": "45-64",
                "value": 8819342}, {
                "name": "≥65",
                "value": 612463}
        ];
    }

	componentDidMount(){
        this.props.changeChartType("Bar");
        this.props.loadData();
    }

    changeChartType(){
        var self = this;
        return function (type){
            self.props.changeChartType(type);
            self.props.loadData();
        }
    }
    selectAllChanged(){
        this.setState({selectAll:!this.state.selectAll})
    }

    getCharts(){
        const {selectAll} = this.state;
        let {data, chartType} = this.props.store.ChartReducer;

        if (selectAll){
            return <div className={styles['charts-wrap']} >
                <div className={styles['chart-wrap-small']} ><LineChartComp data={data} /></div>
                <div className={styles['chart-wrap-small']} ><BarChartComp data={data} /></div>
                <div className={styles['chart-wrap-small']} ><PieChartComp data={data} /></div>
            </div>
        }
        switch (chartType){
            case "Linear":return <div className={styles['chart-wrap']} ><LineChartComp data={data} /></div>
            case "Bar": return <div className={styles['chart-wrap']} ><BarChartComp data={data} /></div>
            case "Circle": return <div className={styles['chart-wrap']} ><PieChartComp data={data} /></div>
            case "Bar2": return <div className={styles['chart-wrap']} ><BarChartComp data={data} /></div>
        }
    }

    render() {
        let {chartType} = this.props.store.ChartReducer;
        return (
            <div id="charts">
                <ChartStatistic onChange={this.changeChartType()}
                                chartType={chartType}
                                selectAllChanged={this.selectAllChanged.bind(this)}
                                selectAll={this.state.selectAll}/>
                {this.getCharts()}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
