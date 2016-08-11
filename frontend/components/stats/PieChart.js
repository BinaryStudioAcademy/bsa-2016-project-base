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
    getInnerRadius(){
        return 0;
    }
    render() {
        const data = this.prepareData(this.props.data)
        const chartSeries = this.generateChartSeries(data);
        const title = this.props.data.title;
        return <ChartWrapper title= {title}>
            <PieTooltip
                title= {title}
                data= {data}
                width= {600}
                height= {500}
                chartSeries= {chartSeries}
                value = {this.valueMap}
                name = {this.nameMap}
                innerRadius = {this.getInnerRadius()}
            />
        </ChartWrapper>
    }
}

