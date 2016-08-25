import React from "react"
import {PropTypes} from "react"
export default class Modelable extends React.Component {
    shouldComponentUpdate(){
        return this.props.model.isActive;
    }
}