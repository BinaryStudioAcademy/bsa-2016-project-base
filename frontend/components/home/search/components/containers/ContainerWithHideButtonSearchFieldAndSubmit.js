import React from "react"
import {PropTypes} from "react"
import ComponentContainer from "./ContainerWithTabs"
import {Alert, Button} from "react-bootstrap"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Container from "./SearchContainerModel"
import DeferredTextInput from "./../TextInput"
import PredicateSearch from "./../pred/PredicateSearchComponent"
import SearchStrategy from "./../SearchStrategy"
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
        const searchStrategy = <SearchStrategy model={model}/>;

        const body = model.shouldShowSearch?
            <div className='extended-search'>
                <header className='extended-search-header'>
                    <h3>Extended Search</h3>
                    {searchStrategy}
                </header>
                
                <ComponentContainer
                    model={model}
                />
                <Divider/>
                <RaisedButton label="Extended Search!"
                              onClick={model.goExtendedSearch}/>
            </div>:"";
        const hint = <div className='hint'><div className='s'>
            <div>#: tags,  @: users,  !: techs,  ~: owners,  nothing:  name, $: description</div>
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
        const searchPreview = <div className='search-pre'>
            <header className='search-pre-header'><h3>Extended Search Preview</h3></header>
            <ul className='seach-pre-list'>
            {model.searchModels.map((model,i)=>
                model.values.length?
                <div key={i} className='search-pre-item'>
                    <div className='model-title'>{model.title} :</div> <div className='mod'>{model.values.map(value=><div className='model-value'>{model.getText(value)}</div>)}</div>
                </div>:""

        )}</ul></div>;

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
