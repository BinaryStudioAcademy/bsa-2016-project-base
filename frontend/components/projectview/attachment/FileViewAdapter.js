import React from "react"
import {PropTypes} from "react"
import File from "./File"

const imagesExt = ["gif", "jpg", "png"];
const otherExt = ["pdf", "zip", "doc", "docx", "rar", "spin", "txt", "xls", "xlsx", "xml", "zip"];
export default class FileViewAdapter extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            file:PropTypes.object.isRequired
        }
    }

    getExtension(file){
        var fileNameArr = file.link.split(".");
        return fileNameArr[fileNameArr.length-1];
    }
    inArray(array, value){
        return array.indexOf(value) > -1
    }
    getThumb(file){
        var extension = this.getExtension(file);
        if (this.inArray(imagesExt, extension)){
            return file.link;
        }
        if (this.inArray(otherExt, extension)) {
            return `/icons/${extension}.png`
        }
        return "/icons/unknown.png";

    }
    adapteFile(file){
        return {
            name:file.name,
            path:file.link,
            ready:true,
            good:true,
            thumb:this.getThumb(file)
        }
    }
    render() {
        const {file} = this.props;
        return React.createElement(File, {file:this.adapteFile(file)}, null);
    }
}