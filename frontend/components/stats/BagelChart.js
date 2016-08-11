import React from "react"
import {PropTypes} from "react"
import PieChart from "./PieChart"
export default class BagelChart extends PieChart {
    constructor() {
        super()
    }

    getInnerRadius(){
        return 60;
    }
}