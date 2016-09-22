/**
 * Created by user on 23.08.2016.
 */
import SearchContainer from "./../search/components/containers/SearchContainerModel"
import TagsModel from "./../search/components/tabs/tags/TagsModel"
import UsersModel from "./../search/components/tabs/users/UsersModel"
import TechnologieModel from "./../search/components/tabs/techs/TechnologiesModel"
import DateModel from "../search/components/tabs/dates/DatesModel"
import HomeContainer from "./../models/HomeContainer"
import OvnersModel from "./../search/components/tabs/owners/OwnersModel"
import PredicateModel from "./../search/components/pred/PredicateModel"
import Location from "./../search/components/tabs/location/LocationModel"
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
                new DateModel({}/*{component: this}*/),
                new Location({}),
            ]
        }),
        //component: this
    })
};
state.model.searchContainer.predicateModel = new PredicateModel(
    {searchContainer:state.model.searchContainer}
);
export default function (that) {
    state.model.component =  that;
    state.model.searchContainer.component = that;
    state.model.searchContainer.predicateModel.component = that;
    state.model.searchContainer.searchModels.forEach(model=>{
        model.component = that;
    });
    return state;
};
