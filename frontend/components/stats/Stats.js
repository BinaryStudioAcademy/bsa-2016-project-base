import React, { Component } from 'react';
import styles from './stats.sass';

import {PieChart, LineChart} from 'react-d3-basic';
import {LineTooltip} from 'react-d3-tooltip'; // do not work
import {BarTooltip, PieTooltip} from 'react-d3-tooltip';
import {LineZoom} from 'react-d3-zoom'; // do not work
import {ScatterBrush} from 'react-d3-brush'; // do not work
import PieChartComp from "./PieChart"
import BarChartComp from "./BarChart"
import LineChartComp from "./LineChart"

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Panel } from 'react-bootstrap';
import * as actions from '../../actions/ChartActions';
class Stats extends Component {
    constructor(props) {
        super(props);
        var self = this;
        var f = (arr,i)=>{
            if (!arr[i])i = 0;
            self.props.changeChartType(arr[i])
            self.props.loadData()
            setTimeout(f.bind(null, arr, i+1), 5000);
        }
        setTimeout(f.bind(null, ["Circle","Bar","Linear"], 0), 2000);
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


    }
    render() {

        let data = this.props.store.ChartReducer.data;
        return (
            <div className={styles.statsPage}>
                <div className={styles.alert}> Display some project stats</div>

                <BarChartComp
                    data={data}/>

                <PieChartComp
                    data={data}/>

                <LineChartComp
                    data={data}/>

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


/*

 <ScatterBrush
 title= {"======="}
 data= {generalChartData}
 width= {width}
 height= {height}
 margins= {margins}
 chartSeries= {chartSeriesBrush}
 x= {x}
 xScale= {xScale}
 brushHeight= {brushHeight}
 />

 */