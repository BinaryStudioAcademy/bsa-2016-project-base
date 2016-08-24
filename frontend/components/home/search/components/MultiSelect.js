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
import Modelable from "./Modelable"
export default class MultiSelect extends Modelable {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(MultiSelectModel)
        }
    }
    getListRightIcon(value){}
    render() {
        const {model} = this.props;
        const self = this;
        const tips = <List>
            {model.tipsError?
                <Subheader>{model.tipsError}</Subheader>:""}
            {model.tips.map((tip,index)=>{
                return <ListItem key={index}
                                 primaryText={model.getText(tip)}
                                 onClick={()=>model.addValue(tip)}
                                 rightIcon={self.getListRightIcon(tip)}/>
            })}</List>;

        const values = <DeletableList model={model}/>;

        return (<div style={{display:"flex"}}>
            <div style={{width:"40%"}}  >
                <div style={{display:"flex",position:"absolute"}}>
                    <DeferredTextInput
                        value={model.custom}
                        hintText={model.customHintText}
                        receiver={model.setCustom}/>
                    {model.isLoading?<CircularProgress size={0.5}/>:""}
                </div>
                <div style={{"marginTop":"40px", overflow:"auto", "maxHeight":"260px"}}>
                    {tips}</div>
            </div>
            <div style={{width:"60%",overflow:"auto", "maxHeight":"300px"}} >
                {values}
            </div>
        </div>)
    }
}