import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class SearchService {

    constructor() {
        this.url = constants.URL + "search/";
    }

    getProjects(query) {

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
        return fetch(`${URL}users?user=${query}`,
            constants.cookieMarker
           ).then(res=>res.json())
            .then(json=>({ tips:json }))
            .catch(error =>({ err:error }));
    }

}
const searchService = new SearchService();
export default searchService;