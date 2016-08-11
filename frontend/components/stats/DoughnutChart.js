import React from "react"
import {PropTypes} from "react"
import AbstractChart from "./AbstractChart"
import ChartWrapper from "./ChartWrapper"
import {Doughnut} from "react-chartjs-2"
export default class DoughnutChart extends AbstractChart{
    constructor() {
        super()
    }
    render() {
        let {data} = this.props;
        this.colors.different(data);
        return <ChartWrapper>
            <Doughnut data={data} options={data.options}/>
        </ChartWrapper>
    }
}