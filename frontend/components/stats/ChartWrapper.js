import React from "react"
import styles from "./stats.sass"
import ResizableBox from "react-resizable-box"
export default class ChartWrapper extends React.Component {
    render() {

        return <ResizableBox>
                <div className={styles.chart}>
                    <h2> {this.props.title} </h2>
                    {this.props.children}
                </div>
            </ResizableBox>

    }
}
