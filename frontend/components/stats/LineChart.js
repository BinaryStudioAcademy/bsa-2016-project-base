import React from "react"
import {PropTypes} from "react"
import AbstractChart from "./AbstractChart"
import {Line} from 'react-chartjs-2';
import ChartWrapper from "./ChartWrapper"
export default class LineChart extends AbstractChart {
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
        const _data = this.colors.sameLine(data);

        _data.datasets.forEach(set=>{
            set.fill = false


        });
        return <ChartWrapper>
            <Line data={_data}
                  options={Object.assign({},_data.options||{},{

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