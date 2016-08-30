import homeService from "./../../../services/homeService"
import searchService from "./../../../services/SearchService"
import Updatable from "./Updatable"
export default class HomeContainer extends Updatable {
    constructor({searchContainer, component}) {
        super(component);
        this.searchContainer = searchContainer;
        this.goSearch = this.goSearch.bind(this)
        this.searchContainer.goSearch = this.goSearch;
        this.searchContainer.homeContainer = this;
        this.pagination = {
            activePage: 0,
            total: 0,
            recordsPerPage: 3
        };
        this.setActivePage = this.setActivePage.bind(this)
        this.projects = [];
        this.loadMore = this.loadMore.bind(this)
    }
    loadMore(){
        if (this.isLoading)return;
        const p = this.pagination;
        if (!p.total||(p.activePage+1)*p.recordsPerPage<p.total){
            p.activePage+=1;
            this.goSearch();
        }
        else{
            this.loadMoreErrorMessage = "No more";
            this.notifyUpdated()
        }
    }
    setActivePage(page) {
        if (this.pagination.activePage !== page.selected ||
            !page.selected && !this.projects.length) {
            //should not do search request when returning on page
            this.pagination.activePage = page.selected;
            this.goSearch();
        }
    }

    goSearch() {
        const self = this;
        this.isLoading = true;
        this.loadMoreErrorMessage = undefined;
        this.notifyUpdated();
        /**
         * @type {Array.<"name=value">}
         */
        var query = this.searchContainer.getQuery().slice();
        //query.recordsPerPage = this.pagination.recordsPerPage;
        //query.activePage = this.pagination.activePage;
        query.push(`limit=${this.pagination.recordsPerPage}`);
        query.push(`skip=${this.pagination.recordsPerPage * (this.pagination.activePage)}`);
        searchService.getProjects(query.join("&"))
            //.then(res=>res.json())
            .then(data=> {
                //self.projects = data.projects || [];
                if (self.pagination.activePage>0){
                    self.projects.push(...data.projects)
                }else {
                    self.projects = data.projects
                }
                if (!self.projects) self.projects = [];
                self.pagination.total = data.total;//should be response.length
                self.isLoading = false;
                self.errorMessage = !self.projects.length ? "Not found":undefined;
                self.notifyUpdated();
            })


    }
}