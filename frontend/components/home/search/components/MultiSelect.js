import React from "react"
import {PropTypes} from "react"
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import TextField from './DeferredTextInput;
import Delete from "material-ui/svg-icons/action/delete"
import DeletableList from "./DeletableList"


export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customInputValue: undefined,
            autoUpdateTimeoutId: 0
        }
    }

    static get propTypes() {
        return {
            /**
             * {values, custom, tips}
             */
            data: PropTypes.object.isRequired,
            /**
             * @param {{values, custom, tips}}newSelectedValues
             */
            receiver: PropTypes.func.isRequired
        }
    }

    getValuesComponents() {
        const {data, receiver} = this.props;

        return <DeletableList
            data={data}
            receiver={receiver}
            getText={value=>value.text}/>
    }

    getTipsComponents() {
        const {data, receiver} = this.props;

        return <List>
            {data.tips.map(tip=> {
                const onClick = ()=> {
                    data.selected = tip;
                    receiver(data);
                };
                return <ListItem primaryText={tip.text}
                                 onClick={onClick}
                                 rightIcon={<ActionInfo />}/>
            })}
        </List>
    }

    componentWillReceiveProps(props) {
        this.setState({customInputValue: props.data.custom})
    }


    onInputChange(value) {
        const {data,receiver} = this.props;
        data.customUpdated = true;
        data.custom = value;
        receiver(data);
    }

    render() {
        const customInputValue = this.state.customInputValue === undefined ?
            this.props.data.custom :
            this.state.customInputValue;

        return (<div style={{display:"flex"}}>
            <div style={{width:"40%"}}>
                <TextField
                    value={customInputValue}
                    receiver={this.onInputChange}
                />

                {this.getTipsComponents()}

            </div>
            <div style={{width:"60%"}}>
                {this.getValuesComponents()}
            </div>


        </div>)
    }
}