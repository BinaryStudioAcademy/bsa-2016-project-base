import React from "react"
import styles from "./stats.sass"
import ResizableBox from "react-resizable-box"
export default class ChartWrapper extends React.Component {
    render() {

              return ( <ResizableBox
              minWidth={300}
              minHeight={300}
              maxWidth={1850}
              maxHeight={1200}
              isResizable={{
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: true,
              bottomLeft: false,
              topLeft: false }}

              onResize={ ()=>{direction: 'right'} }
               >

              <div className={styles.chart}>

                    <h2> {this.props.title} </h2>
                    {this.props.children}
                </div>
                </ResizableBox>
);

    }
}
