import React from "react"
import {PropTypes} from "react"
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import DeferredTextInput from './TextInput';
import Delete from "material-ui/svg-icons/action/delete"
import DeletableList from "./DeletableList"
import MultiSelectModel from "./../models/MultiSelectModel"
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customInputValue: undefined,
            autoUpdateTimeoutId: 0
        }
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(MultiSelectModel)
        }
    }

    render() {
        const {model} = this.props;
        const tips = <List>
            {model.tipsError?
                <Subheader>Error : {model.tipsError}</Subheader>:""}
            {model.tips.map((tip,index)=> {
                return <ListItem key={index}
                                 primaryText={model.getText(tip)}
                                 onClick={()=>model.addValue(tip)}
                                 rightIcon={<ActionInfo />}/>
            })}</List>;

        const values = <DeletableList model={model}/>;

        return (<div style={{display:"flex"}}>
            <div style={{width:"40%"}}  >
                <div style={{display:"flex",position:"absolute"}}>
                    <DeferredTextInput
                        style={{}}
                        value={model.custom}
                        receiver={model.setCustom}/>
                    {model.isLoading?<CircularProgress size={0.5}/>:""}
                </div>
                <div style={{"margin-top":"40px", overflow:"auto", "max-height":"260px"}}>
                    {tips}</div>
            </div>
            <div style={{width:"60%",overflow:"auto", "max-height":"300px"}} >
                {values}
            </div>


        </div>)
    }
}