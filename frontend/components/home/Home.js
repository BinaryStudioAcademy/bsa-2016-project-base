import React, {Component} from 'react';
import Old from "./HomeOld"
import New from "./HomeProjects"
import Search from "./search/components/ContainerWithHideButtonSearchFieldAndSubmit"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeInitialState from "./models/HomeInitialState"
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = HomeInitialState(this);
    }
    render() {
        const model = this.state.model;
        return (<div>
                <MuiThemeProvider>
                    <Search model={model.searchContainer}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <New model={model}/>
                </MuiThemeProvider>
            </div>
        )
    }
}
