import React from "react"
import {PropTypes} from "react"
import {Tabs, Tab} from 'material-ui/Tabs';
import ClassMapper from "./util/ClassMapper"
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
            data:PropTypes.array.isRequired,
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
        const {selectedTab} = this.props;
        const {data} = this.props;
        const tabs = data.map((_data, index)=>{
            const data = _data.data;
            return <Tab value={index}
                        label={`${data.title} (${data.values.length})`}>
                {React.createElement(
                    ClassMapper(data.componentClass),{
                    data,
                    receiver:_data.receiver
                })}
            </Tab>
        });
        /*{React.createElement(data.componentClass,{
         data,
         receiver:_data.receiver
         })}*/
        return (
            <Tabs value={selectedTab}
                  onChange={this.selectedTabChanged.bind(this)}>
                {tabs}
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