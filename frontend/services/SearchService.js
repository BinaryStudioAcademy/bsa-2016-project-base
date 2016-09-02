import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class SearchService {

    constructor() {
        this.url = constants.URL + "search/";
    }

    getLocations(){
        return new Promise((success,failure)=>{
            success([
                {lat:50.425322,lng:30.513381},
                {lat:49.846702,lng:24.025782},
                {lat:46.972842,lng:32.030347},
                {lat:49.875273,lng:36.130145},
                {lat:51.275463,lng: -0.678218},
                {lat:48.936869,lng:2.903663},
                {lat:41.691581,lng:-74.733795},
                {lat:-33.973108,lng:24.173810},
                {lat:-33.964978,lng:18.626915}
                  ])
        });
    }
    getProjects(query) {
        console.log("Request", `${this.url}projects?${query}`)
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