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
			<h2> {this.props.title} </h2>
            {this.props.children}
            </div>
    }
}

