import homeService from "./../../../services/homeService"
import Updatable from "./Updatable"
export default class HomeContainer extends Updatable{
    constructor({searchContainer, component}) {
        super(component);
        this.searchContainer = searchContainer;
        this.goSearch = this.goSearch.bind(this)
        this.searchContainer.goSearch = this.goSearch;
        this.pagination = {
            activePage:0,
            total:3,
            recordsPerPage:2
        };
        this.setActivePage = this.setActivePage.bind(this)
        this.projects = [];
    }
    setActivePage(page){
        if (this.pagination.activePage !== page.selected ||
            !page.selected && !this.projects.length){
            //should not do search request when returning on page
            this.pagination.activePage = page.selected;
            this.goSearch();
        }
    }
    setProjects(response){
        this.projects = response.projects;
        this.pagination.total = projects.length;//should be response.length
        this.isLoading = false;
        this.notifyUpdated();
    }
    onStartSearch(){
        this.isLoading = true;
        this.notifyUpdated()
    }
    goSearch(){
        const self = this;
        self.onStartSearch();
        setTimeout(()=>{
            const query = this.searchContainer.getQuery();
            query.recordsPerPage = this.pagination.recordsPerPage;
            query.activePage = this.pagination.activePage;
            console.info(new Date(), " : ", "sending query ", query);
            homeService.getProjects(query)
                .then(res=>res.json())
                .then(data=>{
                    self.setProjects({projects:data})
                })
                .catch(err=>{
                    self.onErrorSearch && self.onErrorSearch(err)
                    self.isLoading = false;
                    self.notifyUpdated()
                })
        }, 1000);

    }
}