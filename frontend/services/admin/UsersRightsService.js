import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../../constants/Api';

class UsersRightsService {

    constructor(){
        this.url = constants.URL + "rights/";
    }

    getProjectUsers(projectId,filterName, usersRight) {
        let query =  `${this.url}${projectId}/`;
        if(filterName || usersRight){
            query += 'users/';
            if(filterName) query += `filterName=${filterName}`;
            if(filterName && usersRight) query += "&";
            if(usersRight)  query += `usersRight=${usersRight}`;
        }
        return fetch(query,constants.cookieMarker);
    }

    getProjectsList() {
        return fetch(this.url, constants.cookieMarker);
    }

    saveProjectUsers(projectId, data){ 
        return fetch(`${this.url}${projectId}`,
            Object.assign({
                method: "PUT",
                body: JSON.stringify(data)
            },  constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

}

const usersRightsService = new UsersRightsService();
export default usersRightsService;
