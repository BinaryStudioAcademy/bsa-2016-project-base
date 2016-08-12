import React from "react"
import {PropTypes} from "react"
import AbstractChart from "./AbstractChart"
import {Bar} from 'react-chartjs-2';

import ChartWrapper from "./ChartWrapper"
export default class BarChart extends AbstractChart {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            data:PropTypes.array.isRequired
        }
    }

    render() {
        const {data} = this.props;
        let _data = this.colors.same(data)
        return <ChartWrapper>
            <Bar data={_data} options={Object.assign({},data.options||{},{
            legend: {
                display:data.datasets.length>1
            },
            scales: {
                yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero:true
                        }
                }],
                xAxes: [{
                        stacked: false
                }]
            }
        })}/>
        </ChartWrapper>
    }
}