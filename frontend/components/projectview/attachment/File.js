import React from "react"
import {PropTypes} from "react"
import File from "./../../admin/project/sections/File"
export default class MyFile extends File {
    constructor() {
        super()
    }
    getRemoveButton(){
        return null;
    }

}