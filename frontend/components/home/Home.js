import React, {Component} from 'react';
import New from "./HomeProjects"
import Search from "./search/components/ContainerWithHideButtonSearchFieldAndSubmit"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeInitialState from "./models/HomeInitialState"
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = HomeInitialState(this);
      
    }

    componentWillMount() {
        const self = this;
        const {model} = this.state;
        model.component = this;
        model.searchContainer.component = this;
        model.searchContainer.searchModels.forEach(model=>model.component = self);
        if (!model.projects.length && !model.isLoading) {
            //not to upload projects if there are some (on repeated visit)
            model.goSearch();
        }
    }



    render() {
        const model = this.state.model;
        if (model.shouldRefreshOnAppearence){
            model.shouldRefreshOnAppearence = false;
            model.goSearch()
        }
        return (<div className='section-cont' id="home-root">
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
