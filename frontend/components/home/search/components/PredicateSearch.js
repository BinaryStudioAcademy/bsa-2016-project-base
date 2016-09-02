import React from "react"
import {PropTypes} from "react"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PredicateModel from "./../models/PredicateModel";
import TextInput from "./TextInput"
import Divider from 'material-ui/Divider';
import ExtendedSearchTabs from "./ContainerWithTabs"
import Drawer from 'material-ui/Drawer';
import styles from "./styles/predicate.sass"
const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
    height: '80%',
};
const bodyStyle = {
    maxHeight: '300px',
    minHeight: '300px',
    padding: '0 0 0 28px'
}
import Modelable from "./Modelable"
export default class PredicateSearch extends React.Component{
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            model: PropTypes.instanceOf(PredicateModel).isRequired
        }
    }

    render() {
        const {model} = this.props;
        const actions = [
            <FlatButton
                key="1"
                label="Clear Search"
                secondary={true}
                onTouchTap={model.clearSearch}
            />,
            <FlatButton
                key="2"
                label="Cancel"
                primary={true}
                onTouchTap={model.handleClose}
            />,
            <FlatButton
                key="3"
                label="Go Search!"
                disabled={!!model.validateMessage}
                primary={true}
                keyboardFocused={true}
                onTouchTap={model.goSearch}
            />
        ];
        const hint = <div className={styles.hintContainer}>
            <div><h3>Allowed Symbols</h3></div>
            <div className={styles.hintSymbolsFloat}>
                {model.symbols().map((varValue, i)=>
                    <div key={i} onClick={model.insertSymbol.bind(model,varValue.var)}>
                        <span>{varValue.value}</span><span>{varValue.var}</span>
                    </div>
                )}
            </div>
            <Divider/>
            <div className={styles.example}>Example: tag0 & (tag1 -> !tech0)</div>
            <Divider/>
        </div>;
        const varsValues = <div className={styles.hintContainer}>
            <h3>Aliases</h3>
            <div className={styles.hintSymbolsFloat}>
                {model.varsValues().map((varValue, i)=>
                    <div key={i} onClick={model.insertVariable.bind(model,varValue.var)}>
                        <span>{varValue.value}</span><span>{varValue.var}</span>
                    </div>
                )}
            </div>
        </div>;
        const input = <TextInput
            ref={model.setPredicateInput}
            value={model.predicate}
            floatingLabelText="Input Predicate"
            receiver={model.setPredicate}/>;
        return (
            <div>
                <RaisedButton label="More extended" onTouchTap={model.handleOpen}
                              onClick={model.handleOpen}/>
                <Dialog
                    contentStyle={customContentStyle}
                    bodyStyle={bodyStyle}
                    title="Predicate Search"
                    actions={actions}
                    modal={false}
                    open={model.isOpen}
                    onRequestClose={model.handleClose}
                    autoScrollBodyContent={true}

                >
                    <div style={{display:"flex",minHeight:"360px"}}>
                        <div className={styles.left}>

                            {hint}
                            
                            {varsValues}
                            <Divider />
                            {input}
                            <div>{model.validateMessage}</div>
                        </div>
                        <div className={styles.right}>
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