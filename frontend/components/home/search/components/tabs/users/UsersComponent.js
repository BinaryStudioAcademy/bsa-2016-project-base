import React from "react"
import {PropTypes} from "react"
import MultiSelect from "./../multiSelect/MultiSelectComponent"
import Avatar from 'material-ui/Avatar';

export default class Users extends MultiSelect {
    constructor(props) {
        super(props)
    }

    getListRightIcon(value){
        return <Avatar src={value.avatarUrl} size={50}/>
    }
}