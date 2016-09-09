import React from "react"
import {PropTypes} from "react"
import File from "./File"

import fileThumbService from "./../../../services/FileThumbService"
export default class FileViewAdapter extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            file:PropTypes.object.isRequired
        }
    }

    adapteFile(file){
        return {
            name:file.name,
            path:file.link,
            ready:true,
            good:true,
            thumb:fileThumbService.setThumb({path:file.link}).thumb
        }
    }
    render() {
        const {file} = this.props;
        return <File file={this.adapteFile(file)}/>
    }
}