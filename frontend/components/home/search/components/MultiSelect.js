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
import styles from "./styles/list.sass"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class MultiSelect extends Modelable {
    constructor(props) {
        super(props);
        this.leftBlockWidth = "40%";
        this.rightBlockWidth = "60%";
    }

    static get propTypes() {
        return {
            model: PropTypes.instanceOf(MultiSelectModel)
        }
    }

    getListRightIcon(value) {
    }

    getRightBlock() {
        const {model} = this.props
        const values = <DeletableList model={model}/>;

        return (<div style={{width:this.rightBlockWidth,overflow:"auto", "maxHeight":"300px"}}>
            {values}
        </div>)
    }

    getLeftBlock() {
        const {model} = this.props;
        const self = this;

        const tips = <List>
            {model.tipsError ?
                <Subheader>{model.tipsError}</Subheader> : ""}
            {model.tips.map((tip, index)=> {
                return <ListItem style={{WebkitAppearance:"none"}} key={index}
                                 primaryText={model.getText(tip)}
                                 onClick={()=>model.addValue(tip)}
                                 rightIcon={self.getListRightIcon(tip)}/>
            })}</List>;


        return (<div style={{width:this.leftBlockWidth}}>
            <div style={{display:"flex",position:"absolute"}}>
                <DeferredTextInput
                    value={model.custom}
                    hintText={model.customHintText}
                    receiver={model.setCustom}/>
                {model.isLoading ? <CircularProgress size={0.5}/> : ""}
            </div>
            <div style={{"marginTop":"60px", overflow:"auto", "maxHeight":"260px"}}>
                {tips}</div>
        </div>)
    }

    render() {
        return (<div className={styles.listSearch}>
            <div className={styles.rowSearch}>
                {this.getLeftBlock()}
                {this.getRightBlock()}
            </div>
        </div>)
    }
}