import React from "react"
import {PropTypes} from "react"
import FileAdapter from "./FileViewAdapter"
export default class View extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {}
    }

    render() {
        var {project} = this.props;
        return (
            <div style={{display:"flex"}}>
                {project.attachments?<div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    marginTop: "0.5rem"}}>
                    {project.attachments.map(att=><FileAdapter file={att}/>)}
                </div>:"No Attachments"}

            </div>
        )
    }
}