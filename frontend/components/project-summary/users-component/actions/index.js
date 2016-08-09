
import fetch from 'isomorphic-fetch';
import thunk from 'redux-thunk';
// require('es6-promise').polyfill();
const ROOT_URL = 'http://localhost:3000/api/projects';
export const FETCH_USERS = 'RECEIVE_USERS';

export function fetchUsers() {
    return function(dispatch) {
        return fetch(ROOT_URL, { 
            method: 'GET', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            } 
        })
        .then(response => response.json())
        .then(json => {
            let project = json[0];
            for (let i = 0; i < project.users.length; i++) {
                for (let j = 0; j < project.owners.length; j++) {
                    // console.log(project.users[i].userName);
                    if (project.users[i].userName === project.owners[j].userName) {
                        project.users[i].isOwner = true;
                        break;
                    }
                    else {
                        project.users[i].isOwner = false;
                    }
                }
            }
            dispatch({
                type: "RECEIVE_USERS",
                payload: project.users
            })
        });
    };
}
