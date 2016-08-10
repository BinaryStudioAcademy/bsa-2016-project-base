import React from "react"
import {PropTypes} from "react"
import {PieTooltip} from 'react-d3-tooltip'
import AbstractChart from "./AbstractChart"
import ChartWrapper from "./ChartWrapper"
export default class PieChart extends AbstractChart {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            data:PropTypes.array.isRequired
        }
    }

    render() {
        const data = this.prepareData(this.props.data)
        const chartSeries = this.generateChartSeries(data);
        const title = "PieChartTitle"
        return <ChartWrapper>
            <PieTooltip
                title= {title}
                data= {data}
                width= {400}
                height= {400}
                chartSeries= {chartSeries}
                value = {this.valueMap}
                name = {this.nameMap}
                innerRadius = {10}
            />
        </ChartWrapper>
    }
}