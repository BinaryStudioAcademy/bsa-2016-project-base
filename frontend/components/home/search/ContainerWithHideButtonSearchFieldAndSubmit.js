import React from "react"
import {PropTypes} from "react"
import ComponentContainer from "./ContainerWithTabs"
import {Alert, Button} from "react-bootstrap"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Container from "./models/SearchContainer"
import DeferredTextInput from "./components/TextInput"
export default class ContainerWithHideButtonSearchFieldAndSubmit extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(Container)
        }
    }

    render() {
        const {model} = this.props;
        const showButton = model.shouldShowSearch?
            <RaisedButton label="Hide Extended Search"
                          onClick={model.hideSearch}/>:
            <RaisedButton label="Show Extended Search"
                          onClick={model.showSearch}/>

        const body = model.shouldShowSearch?
            <div>
                <h3>Extended Search</h3>
                <ComponentContainer
                    model={model}
                />
                <Divider/>
                <RaisedButton label="Extended Search!"
                              onClick={model.goExtendedSearch}/>
            </div>:"";
        const searchInput = <DeferredTextInput
            value={model.searchString}
            hintText="Search"
            floatingLabelText="Search"
            receiver={model.updateSearchString}
            onKeyUp={e=>(e.keyCode==13)&&model.goSearch()}
        />;
        const fastInputButton = <RaisedButton
            label="Search!"
            onClick={model.goFastSearch}/>
        return (
            <div>
                <div>{searchInput}  {fastInputButton}  {showButton}</div>
                {body}
            </div>
        );
    }
}