/**
 * Created by user on 23.08.2016.
 */
import SearchContainer from "./../search/models/SearchContainer"
import TagsModel from "./../search/models/Tags"
import UsersModel from "./../search/models/Users"
import TechnologieModel from "./../search/models/Technologies"
import DateModel from "./../search/models/Dates"
import HomeContainer from "./../models/HomeContainer"
import OvnersModel from "./../search/models/Owners"
const state = {
    model: new HomeContainer({
        searchContainer: new SearchContainer({
            searchString: "",
            showSearch: false,
            selectedTab: 0,
            //component: this,
            searchModels: [
                new TagsModel({}/*{component: this}*/),
                new TechnologieModel({}/*{component: this}*/),
                new UsersModel({}/*{component: this}*/),
                new OvnersModel({}),
                new DateModel({}/*{component: this}*/)
            ]
        }),
        //component: this
    })
};
export default function (that) {
    state.model.component =  that;
    state.model.searchContainer.component = that;
    state.model.searchContainer.searchModels.forEach(model=>{
        model.component = that;
    });
    return state;
};