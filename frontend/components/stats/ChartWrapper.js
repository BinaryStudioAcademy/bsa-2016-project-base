import React from "react"
import styles from "./stats.sass"
import ResizableBox from "react-resizable-box"

export default class ChartWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return ( 
        <ResizableBox
          customClass="resize-container"
          customStyle={{"margin": "auto"}}
          width={900}
          height={450}
          minWidth={300}
          minHeight={300}
          maxWidth={152vh}
          maxHeight={76vh}
          isResizable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false }}
          onResize={()=>{direction: 'right'}}>
          <div className={styles.chart}>
            <h2> {this.props.title} </h2>
            {this.props.children}
          </div>
        </ResizableBox>
      );
    }
}
