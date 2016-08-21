import React from "react"
import {PropTypes} from "react"
import ComponentContainer from "./ContainerWithTabs"
import {Alert, Button} from "react-bootstrap"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import DeferredTextInput from "./components/DeferredTextInput"
export default class Root extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            data:PropTypes.object.isRequired,
            receiver:PropTypes.object.isRequired
        }
    }

    render() {
        const {data:_data, receiver} = this.props;
        const {handleSearchDismiss,handleSearchShow,
            selectedTabChanged,
            goSearch, updateSearchString} = receiver;
        const goFastSearch = goSearch.bind(null,"fast");
        const goExtendedSearch = goSearch.bind(null, "extended");
        const {showSearch,selectedTab, data, searchString} = _data;
        const showButton = showSearch?
            <RaisedButton label="Hide Extended Search" onClick={handleSearchDismiss}/>:
            <RaisedButton label="Show Extended Search" onClick={handleSearchShow}/>

        const body = showSearch?
            <div>
                <h3>Extended Search</h3>
                <ComponentContainer
                    data={data}
                    selectedTab={selectedTab}
                    selectedTabChanged={selectedTabChanged}
                />
                <Divider/>
                <RaisedButton label="Extended Search!"
                              onClick={goExtendedSearch}/>
            </div>:"";
        const searchInput = <DeferredTextInput
            value={searchString}
            hintText="Search"
            floatingLabelText="Search"
            receiver={updateSearchString}
            onKeyUp={e=>e.keyCode==13/*ENTER*/?goFastSearch():0}
        />;
        const fastInputButton = <RaisedButton
            label="Search!"
            onClick={goFastSearch}/>
        return (
            <div>
                <div>{searchInput}  {fastInputButton}  {showButton}</div>
                {body}
            </div>
        );
    }
}