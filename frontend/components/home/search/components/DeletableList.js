import React from "react"
import {PropTypes} from "react"
import {List, ListItem} from 'material-ui/List';
import Delete from "material-ui/svg-icons/action/delete"
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Model from "./../models/Model"
export default class DeletableList extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(Model)
        }
    }

    render() {
        const {model} = this.props;
        return <List>
            <Subheader>{`Selected ${model.title}:`}</Subheader>
            {model.values.map((value,index)=> {
            const onClick = function(){model.removeValue(value)};
            return <ListItem
                key={index}
                primaryText={model.getText(value)}
                rightIcon={<Delete onClick={onClick}
                                   hoverColor={"#b00000"}/>}/>

        })}</List>;
    }
}