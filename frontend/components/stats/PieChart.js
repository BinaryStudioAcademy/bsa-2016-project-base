import React from "react"
import {PropTypes} from "react"
import {Pie} from 'react-chartjs-2'
import AbstractChart from "./AbstractChart"
import ChartWrapper from "./ChartWrapper"
export default class PieChart extends AbstractChart {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            data:PropTypes.object.isRequired
        }
    }

    render() {
        let {data} = this.props;
        this.colors.different(data);
        return <ChartWrapper>
            <Pie data={data} options={data.options}/>
        </ChartWrapper>
    }
}

