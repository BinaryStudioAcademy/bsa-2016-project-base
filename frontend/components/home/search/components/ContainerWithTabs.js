import React from "react"
import {PropTypes} from "react"
import {Tab, Tabs} from 'material-ui/Tabs';
//import {Tab, Tabs} from "react-bootstrap"
import MultiSelect  from "./MultiSelect"
import DateSelect from "./RangeDateSelect"
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import Container from "./../models/SearchContainer"
export default class ContainerWithTabs extends React.Component {
    constructor(props) {
        super(props)
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(Container)
        }
    }
    componentDidMount(){
        this.props.model.component = this;
        this.props.model.searchModels.forEach(model=>{
            model.component = this;
        });
    }
    render() {
        const {model} = this.props;
        return (

            <Tabs value={model.selectedTab}
                  onChange={model.selectTab}>
                {model.searchModels.map(model=>
                    model.getView())}
            </Tabs>

        );
    }
}