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
                {lat:53.52604744889203,lng:-1.08411407470703125},
                {lat:49.52604744889203,lng:-2.08411407470703125},
                {lat:48.52604744889203,lng:1.08411407470703125},
                {lat:47.52604744889203,lng:-0.08411407470703125},
                {lat:52.52604744889203,lng:.08411407470703125},
                {lat:51.52604744889203,lng:2.08411407470703125}
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