import React from "react"
import {PropTypes} from "react"
import {Tabs, Tab} from 'material-ui/Tabs';
//import {Tab, Tabs} from "react-bootstrap"
import MultiSelect  from "./components/MultiSelect"
import DateSelect from "./components/RangeDateSelect"
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class ComponentContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            /**
             * {tags,users,technologies,date}
             */
            data:PropTypes.object.isRequired,
            /**
             * {tags,users,technologies,date}
             */
            receiver:PropTypes.object.isRequired,
            selectedTab:PropTypes.number.isRequired,
            /**
             * @param newTab
             */
            selectedTabChanged:PropTypes.func.isRequired
        }
    }
    selectedTabChanged(value){
        const {selectedTabChanged} = this.props;
        if ("number" === typeof value){
            selectedTabChanged(value)
        }
    }
    render() {
        const {data, receiver} = this.props;
        const {selectedTab} = this.props;
        return (
            <Tabs value={selectedTab}
                  onChange={this.selectedTabChanged.bind(this)}>
                <Tab value={1} label="Tags">
                    <MultiSelect
                        data={data.tags}
                        receiver={receiver.tags}/>
                </Tab>
                <Tab value={2} label="Users">
                    <MultiSelect
                        data={data.users}
                        receiver={receiver.users}/>
                </Tab>
                <Tab value={3} label="Technologies">
                    <MultiSelect
                        data={data.technologies}
                        receiver={receiver.technologies}/>
                </Tab>
                <Tab value={4} label="Date">
                    <DateSelect
                        data={data.date}
                        receiver={receiver.date}/>
                </Tab>
            </Tabs>
        );
    }
}