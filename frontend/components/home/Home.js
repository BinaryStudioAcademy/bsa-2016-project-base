import React, {Component} from 'react';
import Old from "./HomeOld"
import New from "./HomeProjects"
import Search from "./search/ContainerWithHideButtonSearchFieldAndSubmit"
import SearchContainer from "./search/models/SearchContainer"
import TagsModel from "./search/models/Tags"
import UsersModel from "./search/models/Users"
import TechnologieModel from "./search/models/Technologies"
import DateModel from "./search/models/Dates"
import HomeContainer from "./models/HomeContainer"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.model = new HomeContainer({
            searchContainer: new SearchContainer({
                searchString:"str",
                showSearch:false,
                selectedTab:1,
                container:this,
                searchModels:[
                    new TagsModel({container:this}),
                    new TechnologieModel({container:this}),
                    new UsersModel({container:this}),
                    new DateModel({container:this})
                ]
            }),
            container:this
        });
    }
    render() {
        const model = this.model;
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
