import Updatable from "./../../models/Updatable"
import parser from "./searchStringParser/parser"
const Query = {
    FAST:1,
    EXTENDED:2
};
export default class SearchContainer extends Updatable{
    constructor({searchString,showSearch,selectedTab,
        searchModels, component}) {
        super(component);
        this.searchString = searchString;
        this.shouldShowSearch = showSearch;
        this.selectedTab = selectedTab;
        this.currentQuery = Query.FAST;
        this.searchModels = searchModels;
        this.shouldShowHint = false;
        this.selectTab = this.selectTab.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
        this.goFastSearch = this.goFastSearch.bind(this);
        this.goExtendedSearch = this.goExtendedSearch.bind(this);
        this.showHint = this.showHint.bind(this);
        this.hideHint = this.hideHint.bind(this);
    }
    updateSearchString(searchString){
        this.searchString = searchString;
        //this.notifyUpdated()
    }
    goExtendedSearch(){
        this.currentQuery = Query.EXTENDED;
        this.goSearch();
    }
    goFastSearch(){
        this.currentQuery = Query.FAST;
        this.goSearch();
    }

    /**
     *
     * @returns {Array<"name=value">}
     */
    getQuery(){
        if (this.currentQuery == Query.FAST){
            return parser(this.searchString);
        }
        if (this.currentQuery == Query.EXTENDED){
            var query = [];
            for (let model of this.searchModels){
                query.push(model.getRequestRepresentation());
            }
            return query.filter(value=>value);//.join("&");
        }
    }
    showSearch(){
        this.shouldShowSearch = true;
        this.notifyUpdated()
    }
    hideSearch(){
        this.shouldShowSearch = false;
        this.notifyUpdated()
    }
    showHint(){
        this.shouldShowHint = true;
        this.notifyUpdated();
    }
    hideHint(){
        this.shouldShowHint = false;
        this.notifyUpdated();
    }
    selectTab(tab){
        if ("number" === typeof tab){
            this.selectedTab = tab;
            this.notifyUpdated()
        }
    }

}