import React from "react"
import {PropTypes} from "react"
import AbstractChart from "./AbstractChart"
import {LineTooltip} from 'react-d3-tooltip';
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
        const data = this.prepareData(this.props.data)
        const chartSeries = [{
            field: 'value',
            name: 'chartSeriesTooltip Mapped Value Line'
        }
        ];
        const title = "LineChartTitle"
        const xScale = 'ordinal';
        const yTicks = [10, "d"];
        return <ChartWrapper>
            <LineTooltip
                title= {title}
                data= {data}
                width= {700}
                height= {400}
                margins={{left: 70, right: 70, top: 70, bottom: 70}}
                chartSeries = {chartSeries}
                x= {this.nameMap}
                xScale= {xScale}
                yTicks= {yTicks}
            />
        </ChartWrapper>
    }
}