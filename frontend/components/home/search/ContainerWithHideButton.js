import React from "react"
import {PropTypes} from "react"
import ComponentContainer from "./ContainerWithTabs"
import {Alert, Button} from "react-bootstrap"
import RaisedButton from 'material-ui/RaisedButton';
export default class Root extends React.Component {
    constructor() {
        super()
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
            selectedTabChanged, dataReceiver} = reduxReceiver;
        const {showSearch,selectedTab, data} = reduxData;
        const button = showSearch?
            <RaisedButton label="Hide" onClick={handleSearchDismiss}/>:
            <RaisedButton label="Show Fast Search" onClick={handleSearchShow}/>
        const body = showSearch?
            <div>
                <h3>Fast Search</h3>
                <ComponentContainer
                    data={data}
                    receiver={dataReceiver}
                    selectedTab={selectedTab}
                    selectedTabChanged={selectedTabChanged}
                />
            </div>:"";
        return (
            <div>
                {button}
                {body}
            </div>
        );
    }
}