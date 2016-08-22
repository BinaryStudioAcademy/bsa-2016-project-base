import homeService from "./../../../services/homeService"

export default class HomeContainer {
    constructor({searchContainer, container}) {
        this.searchContainer = searchContainer;
        this.goSearch = this.goSearch.bind(this)
        this.searchContainer.goSearch = this.goSearch;
        this.pagination = {
            activePage:0,
            total:3,
            recordsPerPage:2
        };
        this.container = container;
        this.setActivePage = this.setActivePage.bind(this)
        this.projects = [];
    }
    setActivePage(page){
        this.pagination.activePage = page.selected;
        this.goSearch();
    }
    notifyUpdated(){
        this.container.forceUpdate()
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