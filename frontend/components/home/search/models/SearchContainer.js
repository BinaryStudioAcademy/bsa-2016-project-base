import Updatable from "./../../models/Updatable"
import parser from "./searchStringParser/parser"
import SearchStrategy from "./../const/SearchStratrgy"
export default class SearchContainer extends Updatable{
    constructor({searchString,showSearch,selectedTab,
        searchModels, component}) {
        super(component);
        this.searchString = searchString;
        this.shouldShowSearch = showSearch;
        this.selectedTab = selectedTab;
        this.currentQuery = [];
        this.searchModels = searchModels;
        this.shouldShowHint = false;
        this.searchStrategy = SearchStrategy.DEFAULT;
        this.selectTab = this.selectTab.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
        this.goFastSearch = this.goFastSearch.bind(this);
        this.goExtendedSearch = this.goExtendedSearch.bind(this);
        this.showHint = this.showHint.bind(this);
        this.hideHint = this.hideHint.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }
    varsValues(){
        return this.searchModels.map(model=> {
            return model.values.map((value, index)=> {
                return {
                    "var": model.getTitleInSingular().toLowerCase() + index,
                    value: model.getText(value)
                }
            })
        }).reduce((arr, elems)=>arr.concat(elems), []);
    }
    setStrategy(strategy){
        this.searchStrategy = strategy;
    }
    updateSearchString(searchString){
        this.searchString = searchString;
        //this.notifyUpdated()
    }
    getPredicate(query){
        const vars = this.varsValues().map(entry=>entry.var);
        if (vars.length){
            const strategy = this.searchStrategy;
            switch (strategy){
                case SearchStrategy.BY_AND:
                    return query.push(`predicate=${encodeURIComponent(vars.join("&"))}`);
                case SearchStrategy.BY_OR:
                    return query.push(`predicate=${encodeURIComponent(vars.join("|"))}`);
                default:return;
            }
        }
    }
    goExtendedSearch(){
        this.currentQuery = this.searchModels
            .map(model=>model.getRequestRepresentation())
            .filter(value=>value);
        this.getPredicate(this.currentQuery);
        if (this.homeContainer) this.homeContainer.pagination.activePage = 0;
        this.goSearch();
    }
    goFastSearch(){
        this.currentQuery = parser(this.searchString);
        if (this.homeContainer) this.homeContainer.pagination.activePage = 0;
        this.goSearch();
    }

    /**
     *
     * @returns {Array<"name=value">}
     */
    getQuery(){
        return this.currentQuery;
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
    clearSearch(){
        this.searchModels.forEach(model=>{
            model.clear();
        });
        this.notifyUpdatedAll();
    }
    notifyUpdatedAll(){
        this.searchModels.forEach(model=>model.isActive = true);
        const models = this.searchModels;
        super.notifyUpdated(()=>{
            models.forEach(model=>model.isActive = false)
        });
    }

}