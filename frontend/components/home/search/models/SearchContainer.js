
const Query = {
    FAST:1,
    EXTENDED:2
};
export default class SearchContainer {
    constructor({searchString,showSearch,selectedTab,
        searchModels, container}) {
        this.searchString = searchString;
        this.shouldShowSearch = showSearch;
        this.selectedTab = selectedTab;
        this.currentQuery = Query.FAST;
        this.searchModels = searchModels;
        this.container = container;
        this.selectTab = this.selectTab.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
        this.goFastSearch = this.goFastSearch.bind(this);
        this.goExtendedSearch = this.goExtendedSearch.bind(this);
    }
    updateSearchString(searchString){
        this.searchString = searchString;
        this.notifyUpdated()
    }
    goExtendedSearch(){
        this.currentQuery = Query.EXTENDED;
        this.goSearch();
    }
    goFastSearch(){
        this.currentQuery = Query.FAST;
        this.goSearch();
    }
    getQuery(){
        if (this.currentQuery == Query.FAST){
            return {
                string:this.searchString
            }
        }
        if (this.currentQuery == Query.EXTENDED){
            const query = {};
            for (let model of this.searchModels){
                query[model.getNameInRequest()] =
                    model.getValueInRequest()
            }
            return query;
        }
    }
    notifyUpdated(){
        this.container.forceUpdate()
    }
    showSearch(){
        this.shouldShowSearch = true;
        this.notifyUpdated()
    }
    hideSearch(){
        this.shouldShowSearch = false;
        this.notifyUpdated()
    }
    selectTab(tab){
        if ("number" === typeof tab){
            this.selectedTab = tab;
            this.container.forceUpdate()
        }
    }

}