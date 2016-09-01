import React from "react"
import {PropTypes} from "react"
import {Tab, Tabs} from 'material-ui/Tabs';
//import {Tab, Tabs} from "react-bootstrap"
import MultiSelect  from "./MultiSelect"
import DateSelect from "./RangeDateSelect"
/*var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();*/
import Container from "./../models/SearchContainer"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const tabsStyles = {
      headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400
        },
        tabItemContainerStyle: {
            backgroundColor: "#8D97A4"
        },

        tabBlock: {
            "margin-top": "40px"
        },
        inkBarStyle: {
            backgroundColor: "#2ecc71"
        }
};


export default class ContainerWithTabs extends React.Component {
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
        return (
        <MuiThemeProvider>
            <Tabs value={model.selectedTab}
                  onChange={model.selectTab} 
                  tabItemContainerStyle={tabsStyles.tabItemContainerStyle}
                  contentContainerStyle={tabsStyles.tabBlock} inkBarStyle={tabsStyles.inkBarStyle}>
                {model.searchModels.map(model=>
                    model.getView())}
            </Tabs>
        </MuiThemeProvider>
        );
    }
}