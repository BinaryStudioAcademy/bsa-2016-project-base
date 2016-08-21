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
    getMultiSelectTab(name, index){
        const {data, receiver} = this.props;

        return <Tab value={index}
                    label={`${data[name].title} (${data[name].values.length}`}>
            <MultiSelect
                data={data[name]}
                receiver={receiver[name]}/>
        </Tab>
    }
    render() {
        const {selectedTab} = this.props;
        const {data, receiver} = this.props;

        return (
            <Tabs value={selectedTab}
                  onChange={this.selectedTabChanged.bind(this)}>
                {this.getMultiSelectTab("tags",1)}
                {this.getMultiSelectTab("users",2)}
                {this.getMultiSelectTab("technologies",3)}
                <Tab value={4} label={`Date (${data.date.values.length})`}>
                    <DateSelect
                        data={data.date}
                        receiver={receiver.date}/>
                </Tab>
            </Tabs>
        );
    }
}
/*<Tab value={1} label={`Tags (${data.tags.values.length})`}>
 <MultiSelect
 data={data.tags}
 receiver={receiver.tags}/>
 </Tab>
 <Tab value={2} label={`Users (${data.users.values.length})`}>
 <MultiSelect
 data={data.users}
 receiver={receiver.users}/>
 </Tab>
 <Tab value={3} label={`Technologies (${data.technologies.values.length})`}>
 <MultiSelect
 data={data.technologies}
 receiver={receiver.technologies}/>
 </Tab>
 <Tab value={4} label={`Date (${data.date.values.length})`}>
 <DateSelect
 data={data.date}
 receiver={receiver.date}/>
 </Tab>*/