import React from "react"
import {PropTypes} from "react"
import {List, ListItem} from 'material-ui/List';
import Delete from "material-ui/svg-icons/action/delete"
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

export default class DeletableList extends React.Component {
    constructor() {
        super()
    }

    static get propTypes() {
        return {
            data:PropTypes.object.isRequired,
            receiver:PropTypes.func.isRequired,
            /**
             * @param elementOf(data.values)
             */
            getText:PropTypes.string.isRequired,
            header:PropTypes.string
        }
    }

    render() {
        const {data, receiver, getText, header} = this.props;
        return <List>
            <Subheader>{header || "Selected"}</Subheader>
            {data.values.map(value=> {
            const onClick = function () {
                data.toDelete = value;
                receiver(data);
            };
            return <ListItem primaryText={getText(value)}
                             rightIcon={<Delete
                                            onClick={onClick}
                                            hoverColor={"#b00000"}/>}
            />

        })}</List>;
    }
}