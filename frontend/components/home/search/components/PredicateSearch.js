import React from "react"
import {PropTypes} from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PredicateModel from "./../models/PredicateModel";
import TextInput from "./TextInput"
import Divider from 'material-ui/Divider';
import ExtendedSearchTabs from "./ContainerWithTabs"
const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
    height: '80%',
    maxHeight: 'none',
    minHeight: "640px"
};
export default class PredicateSearch extends React.Component {
    constructor(props){
        super(props);
    }
    static get propTypes(){
        return {
            model:PropTypes.instanceOf(PredicateModel).isRequired
        }
    }
    render() {
        const {model} = this.props;
        const actions = [
            <FlatButton
                key="1"
                label="Cancel"
                primary={true}
                onTouchTap={model.handleClose}
            />,
            <FlatButton
                key="2"
                label="Go Search!"
                disabled={!!model.validateMessage}
                primary={true}
                keyboardFocused={true}
                onTouchTap={model.goSearch}
            />
        ];
        const hint = <div>
            <table>
                <thead><tr><td><h3>Allowed Symbols</h3></td></tr></thead>
                <tbody>
                <tr><td>AND</td><td>&</td><td>OR</td><td>|</td></tr>
                <tr><td>MOD2</td><td>+</td><td>NOT</td><td>!</td></tr>
                <tr><td>IMPLICATION</td><td>-></td><td>Brackets</td><td>(  )</td></tr>
                </tbody>
            </table>
            <Divider/>
            <div>Example: tag0 & (tag1 -> !tech0)</div>
            <Divider/>
        </div>;
        const varsValues = model.varsValues().map((varValue,i)=>
                <div key={i}>{varValue.var} : {varValue.value}</div>
        );
        const input = <TextInput
                        value={model.predicate}
                        floatingLabelText="Input Predicate"
                        receiver={model.setPredicate}/>

        return (
            <div>
                <RaisedButton label="More extended" onTouchTap={model.handleOpen}
                    onClick={model.handleOpen}/>
                <Dialog
                    contentStyle={customContentStyle}
                    title="Predicate Search"
                    actions={actions}
                    modal={false}
                    open={model.isOpen}
                    onRequestClose={model.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div style={{display:"flex"}}>
                        <div style={{width:"30%"}}>
                            {hint}
                            <h3>Aliases</h3>
                            {varsValues}
                            {input}
                            <div>{model.validateMessage}</div>
                        </div>
                        <div style={{width:"70%"}}>
                            <div>
                                <ExtendedSearchTabs model={model.searchContainer}/>
                            </div>
                        </div>
                    </div>

                </Dialog>
            </div>
        );
    }
}