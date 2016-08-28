import React from "react"
import {PropTypes} from "react"
import ComponentContainer from "./ContainerWithTabs"
import {Alert, Button} from "react-bootstrap"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Container from "./../models/SearchContainer"
import DeferredTextInput from "./TextInput"
import PredicateSearch from "./PredicateSearch"
export default class ContainerWithHideButtonSearchFieldAndSubmit extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(Container)
        }
    }
    componentWillReceiveProps(props){
        props.model.component = this;
    }
    render() {
        const {model} = this.props;
        const showButton = model.shouldShowSearch?
            <div className='col-inputs'><RaisedButton label="Hide Extended Search"
                          onClick={model.hideSearch}/></div>:
            <div className='col-inputs'><RaisedButton label="Show Extended Search"
                          onClick={model.showSearch}/></div>

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
        const hint = <div className='hint'><div className='s'>
            <div>#: tags,  @: users,  !: techs,  ~: owners,  nothing:  name</div>
            <div>Example: #partOfTag !partOfTech partOfName</div></div>
        </div>;

        const searchInput = <div className='col-inputs'><DeferredTextInput
            onFocus={model.showHint}
            onBlur={model.hideHint}
            value={model.searchString}
            hintText="Search"
            receiver={model.updateSearchString}
            onKeyUp={e=>(e.keyCode==13)&&model.goFastSearch()}
        /></div>;
        const fastInputButton = <div className='col-inputs'><RaisedButton
            label="Search!"
            onClick={model.goFastSearch}/></div>;
        const clearSearchButton = model.shouldShowSearch?<div><RaisedButton
            label="Clear Search"
            secondary={true}
            onClick={model.clearSearch}/></div>:"";
        const searchPreview = <div>
            <div>Search Preview</div>
            {model.searchModels.map(model=>
                model.values.length?
                <div>
                    {model.title} : {model.values.map(value=>model.getText(value)).join(", ")}
                </div>:""
        )}</div>;
        const predicateSearch = model.shouldShowSearch?<PredicateSearch model={model.predicateModel}/>:"";
        return (
            <div className='inputs-tool'>
                <div id='inputs'>{searchInput}  {fastInputButton}  {showButton} {clearSearchButton} {predicateSearch}</div>
                {model.shouldShowHint?hint:""}
                {/*hint*/}
                {searchPreview}
                {body}

            </div>
        );
    }
}