import React from "react"
import {PropTypes} from "react"
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Delete from "material-ui/svg-icons/action/delete"
import DeletableList from "./DeletableList"
import DeferredTextInput from "./DeferredTextInput"
import Subheader from 'material-ui/Subheader';

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            /**
             * {values, custom, tips}
             */
            data: PropTypes.object.isRequired,
            /**
             * @param {{values, custom, tips}}newData
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
        const {tipsHeader} = data;
        return <List>
            <Subheader>{tipsHeader}</Subheader>
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


    onInputChange(value) {
        const {data,receiver} = this.props;
<<<<<<< HEAD
        data.customUpdated = true;
        data.custom = value;
        receiver(data);
=======
        const {autoUpdateTimeoutId} = this.state;
        clearTimeout(autoUpdateTimeoutId);

        const newTimeoutId = setTimeout((value, data, receiver)=> {
            data.customUpdated = true;
            data.custom = value;
            receiver(data)
        }, 300, e.target.value, data, receiver);

        this.setState({
                customInputValue: e.target.value,
                autoUpdateTimeoutId: newTimeoutId
            }
        )

>>>>>>> parent of 7f3edc1... combined search and project view together
    }

    render() {
        const {custom, floatingLabelText} = this.props.data;

        return (<div style={{display:"flex"}}>
            <div style={{width:"40%"}}>
                <DeferredTextInput
                    floatingLabelText={floatingLabelText}
                    value={custom}
                    receiver={this.onInputChange.bind(this)}/>

                {this.getTipsComponents()}

            </div>
            <div style={{width:"60%"}}>
                {this.getValuesComponents()}
            </div>


        </div>)
    }
}