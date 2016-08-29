import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class UsersService {

    constructor(){
        this.url = {
            projects: `${constants.URL}projects/`,
            users: `${constants.URL}users/`
        };
    }

    getAllUsers(projectId) {
        return fetch(`${this.url.projects}${projectId}/users`,constants.cookieMarker);
    }

    getAllOwners(projectId) {
        return fetch(`${this.url.projects}${projectId}/owners`,constants.cookieMarker);
    }

    getAllUsersOfAllProjects() {
        return fetch(this.url.users,constants.cookieMarker);
    }

    addNewUser(userObj) {
        return fetch(this.url.users, 
            Object.assign({
                method: 'POST',
                body: JSON.stringify(userObj)
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

    updateUser(userObj) {
        return fetch(this.url.users, 
            Object.assign({
                method: 'PUT',
                body: JSON.stringify(userObj)
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

    removeUser(idUser) {
        return fetch(`${this.url.users}${idUser}` ,
            Object.assign({
                method: 'DELETE',
                body: JSON.stringify(userObj)
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

    getAllProjects() {
        return fetch(this.url.projects, constants.cookieMarker);
    }

}

const usersService = new UsersService();
export default usersService;