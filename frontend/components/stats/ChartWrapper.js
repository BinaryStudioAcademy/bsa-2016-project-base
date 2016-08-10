import React from "react"
import {PropTypes} from "react"
import styles from "./stats.sass"
export default class ChartWrapper extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {}
    }

    render() {
        return <div className={styles.chart}>
            {this.props.children}
            </div>
    }
}