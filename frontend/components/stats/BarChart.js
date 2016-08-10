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
        const title = this.props.data.title;

        const chartSeries = [{
                field: 'value',
                name: title
            }
        ];
        const xScale = 'ordinal';
        const yTicks = [10, "d"];
        return <ChartWrapper title= {title}>
            <BarTooltip
                title= {title}
                data= {data}
                width= {900}
                height= {400}
                chartSeries = {chartSeries}
                x= {this.nameMap}
                xScale= {xScale}
                yTicks= {yTicks}
            />
        </ChartWrapper>
    }
}