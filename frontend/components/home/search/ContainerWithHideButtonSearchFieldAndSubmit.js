import React from "react"
import {PropTypes} from "react"
import ComponentContainer from "./ContainerWithTabs"
import {Alert, Button} from "react-bootstrap"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Root extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            /**{
             *      showSearch,
             *      selectedTab,
             *      data:{
             *          tags: {values, custom, tips},
             *          users: {values, custom, tips},
             *          technologies: {values, custom, tips},
             *          date: {values, custom}
             *      }
             * }
             */
            reduxData:PropTypes.object.isRequired,
            /**
             * {
             *      handleSearchShow,
             *      handleSearchDismiss,
             *      selectedTabChanged,
             *      dataReceiver:{
             *          tags,
             *          users,
             *          technologies,
             *          date
             *      }
             * }
             */
            reduxReceiver:PropTypes.object.isRequired
        }
    }

    render() {
        const {reduxData, reduxReceiver} = this.props;
        const {handleSearchDismiss,handleSearchShow,
            selectedTabChanged, dataReceiver,
            goSearch, updateSearchString} = reduxReceiver;
        const goFastSearch = goSearch.bind(null,"fast");
        const goExtendedSearch = goSearch.bind(null, "extended");
        const {showSearch,selectedTab, data, searchString} = reduxData;
        const showButton = showSearch?
            <RaisedButton label="Hide Extended Search" onClick={handleSearchDismiss}/>:
            <RaisedButton label="Show Extended Search" onClick={handleSearchShow}/>
        const body = showSearch?
            <div>
                <h3>Extended Search</h3>
                <ComponentContainer
                    data={data}
                    receiver={dataReceiver}
                    selectedTab={selectedTab}
                    selectedTabChanged={selectedTabChanged}
                />
                <RaisedButton label="Extended Search!"
                              onClick={goExtendedSearch}/>
            </div>:"";
        const searchInput = <TextField
            value={searchString}
            hintText="Search"
            floatingLabelText="Search"
            onChange={(e)=>updateSearchString(e.target.value)}
            onKeyUp={e=>e.keyCode==13/*ENTER*/?goFastSearch():0}
        />;
        const fastInputButton = <RaisedButton
            label="Search!"
            onClick={goFastSearch}/>
        return (
            <div>
                <div>{searchInput}{fastInputButton}{showButton}</div>
                {body}
            </div>
        );
    }
}