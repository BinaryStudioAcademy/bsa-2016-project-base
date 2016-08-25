import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

import {API} from '../constants/API';
const URL = API+"search/"
class SearchService {
    constructor() {}
    getProjects(query){
        console.log("sending query: "+URL+"projects?"+query);
        return fetch(`${URL}projects?${query}`)
            .then(res=>res.json())
            .then(json=>{return({
                projects:json.sortedProjList,
                total:json.found
            })})
            .catch(e=>{return({err:e})})
    }
    getTechs(query){
        return fetch(`${URL}techs?tech=${query}`)
            .then(res=>res.json())
            .then(json=>({tips:json}))
            .catch(e=>({err:e}))
    }
    getTags(query){
        return fetch(`${URL}tags?tag=${query}`)
            .then(res=>res.json())
            .then(json=>({tips:json}))
            .catch(e=>({err:e}))
    }
    getUsers(query){
        return fetch(`${URL}users?user=${query}`)
            .then(res=>res.json())
            .then(json=>({tips:json}))
            .catch(e=>({err:e}))
    }
}

export default new SearchService()