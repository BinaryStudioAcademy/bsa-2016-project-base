import React from "react"
import {PropTypes} from "react"
import AbstractChart from "./AbstractChart"
import {BarTooltip} from 'react-d3-tooltip';

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
        const data = this.prepareData(this.props.data);
        const chartSeries = [{
                field: 'value',
                name: 'chartSeriesTooltip Mapped Value Bar'
            }
        ];
        const xScale = 'ordinal';
        const yTicks = [10, "d"];
        const title = "Bar Chart Title"
        return <ChartWrapper>
            <BarTooltip
                title= {title}
                data= {data}
                width= {700}
                height= {400}
                chartSeries = {chartSeries}
                x= {this.nameMap}
                xScale= {xScale}
                yTicks= {yTicks}
            />
        </ChartWrapper>
    }
}