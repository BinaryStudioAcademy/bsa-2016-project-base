import React from "react"
import styles from "./stats.sass"
import ResizableBox from "react-resizable-box"

export default class ChartWrapperInitial extends React.Component {

    constructor(props) {
        super(props);
        this.initialWidth = 900;
        this.initialHeight = 450;
        this.initialMinWidth = 300;
        this.initialMinHeight = 150;
        this.initialMaxWidth = 1400;
        this.initialMaxHeight = 700;
    }

    update() {
        if (this.resizable) this.resizable.updateSize({ width: this.initialWidth, height: this.initialHeight });
    }

    render() {
      this.update();
      return ( 
        <ResizableBox ref={c => { this.resizable = c; }}
          customClass="resize-container"
          customStyle={{"margin": "auto"}}
          width={this.initialWidth}
          height={this.initialHeight}
          minWidth={this.initialMinWidth}
          minHeight={this.initialMinHeight}
          maxWidth={this.initialMaxWidth}
          maxHeight={this.initialMaxHeight}
          isResizable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false }}
          onResize={()=>{direction: 'bottomRight'}}>
          <div className={styles.chart}>
            <h2> {this.props.title} </h2>
            {this.props.children}
          </div>
        </ResizableBox>
      );
    }
}
