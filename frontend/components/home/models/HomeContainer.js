import homeService from "./../../../services/homeService"
import searchService from "./../../../services/SearchService"
import Updatable from "./Updatable"
export default class HomeContainer extends Updatable {
    constructor({searchContainer, component}) {
        super(component);
        this.searchContainer = searchContainer;
        this.goSearch = this.goSearch.bind(this)
        this.searchContainer.goSearch = this.goSearch;
        this.pagination = {
            activePage: 0,
            total: 0,
            recordsPerPage: 6
        };
        this.setActivePage = this.setActivePage.bind(this)
        this.projects = [];
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
        this.notifyUpdated();
        /**
         * @type {Array.<"name=value">}
         */
        var query = this.searchContainer.getQuery();
        //query.recordsPerPage = this.pagination.recordsPerPage;
        //query.activePage = this.pagination.activePage;
        query.push(`limit=${this.pagination.recordsPerPage}`);
        query.push(`skip=${this.pagination.recordsPerPage * (this.pagination.activePage)}`);
        searchService.getProjects(query.join("&"))
            //.then(res=>res.json())
            .then(data=> {
                self.projects = data.projects || [];
                self.pagination.total = data.total;//should be response.length
                self.isLoading = false;
                self.error = data.err;
                self.notifyUpdated();
            })


    }
}