import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';

class UsersService {

    getAllUsers(projectId) {
        return fetch(`${API}projects/${projectId}/users`);
}
    
    getAllOwners(projectId) {
        return fetch(`${API}projects/${projectId}/owners`);
    }

    getAllUsersOfAllProjects() {
        return fetch(`${API}api/users/`);
    }

    addNewUser(userObj) {
        return fetch(`${API}users/`, {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }


    updateUser(userObj) {
        return fetch(`${API}`, {
            method: 'PUT',
            body: JSON.stringify(userObj),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }
    removeUser(idUser) {
        return fetch("http://localhost:3000/api/users/" + idUser, {
            method: 'DELETE',
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }
    getAllProjects() {
        return fetch(`${API}projects/`, { method: 'GET', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            }
        });
    }

}

const usersService = new UsersService();
export default usersService;