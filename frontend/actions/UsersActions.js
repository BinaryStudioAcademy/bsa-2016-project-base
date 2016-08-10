import * as types from '../constants/UsersActionTypes';
import userService from '../services/userService';

export function fetchUsers() {
    return (dispatch) => {
        dispatch({
            type: types.USERS_GET_ALL_START_LOADING
        });
        return userService.getAllProjects()
            .then(response => response.json())
            .then(json => {
                let project = json[0];
                for (let i = 0; i < project.users.length; i++) {
                    for (let j = 0; j < project.owners.length; j++) {
                        if (project.users[i].userName === project.owners[j].userName) {
                            project.users[i].isOwner = true;
                            break;
                        }
                        else {
                            project.users[i].isOwner = false;
                        }
                    }
                }
                console.log(project.users);
                dispatch({
                    type: types.USERS_GET_ALL_LOADED,
                    payload: project.users
                });
            })
            .catch( err => {
                dispatch({
                    type: types.USERS_GET_ALL_ERROR,
                    error: err
                });
            });
    };
}