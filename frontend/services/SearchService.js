import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class SearchService {

    constructor() {
        this.url = constants.URL + "search/";
    }

    getProject(id){
        var query = `id=${id}&skip=0&limit=1`
        console.log(query);
        return fetch(`${this.url}projects?${query}`,
             constants.cookieMarker).then(res => res.json())
            .then(json => ({project:json.sortedProjList[0]}))
            .catch(error => ({err:error}))
    }

    getLocations(){
        return fetch(`${this.url}locations`, constants.cookieMarker)
            .then(res => res.json())
            .then(json => ({locations:json}))
            .catch(error => ({err:error}))
    }

    getProjects(query) {
        console.log(query)
        return fetch(`${this.url}projects?${query}`,
            constants.cookieMarker
           ).then(res => res.json())
            .then(json =>{
                return({
                    projects: json.sortedProjList,
                    total: json.found
                })
            }).catch(error =>({ err:error }));
    }

    getTechs(query){
        return fetch(`${this.url}techs?tech=${query}`,
            constants.cookieMarker
           ).then(res=>res.json())
            .then(json=>({ tips:json }))
            .catch(error =>({ err:error }));
    }

    getTags(query){
        return fetch(`${this.url}tags?tag=${query}`,
            constants.cookieMarker
           ).then(res=>res.json())
            .then(json=>({ tips:json }))
            .catch(error =>({ err:error }));
    }

    getUsers(query){
        return fetch(`${this.url}users?user=${query}`,
            constants.cookieMarker
           ).then(res=>res.json())
            .then(json=>({ tips:json }))
            .catch(error =>({ err:error }));
    }

}

const searchService = new SearchService();
export default searchService;