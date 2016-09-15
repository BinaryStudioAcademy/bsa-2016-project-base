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
            <ul className='attach-list'>
                {project.attachments?project.attachments.map(att=><FileAdapter file={att}/>)
                :"No Attachments"}

            </ul>
        )
    }
}