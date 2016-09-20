import userService from '../services/userService';
import * as types from '../constants/UsersActionTypes';

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
                        else project.users[i].isOwner = false;
                    }
                }
                dispatch({
                    type: types.USERS_GET_ALL_LOADED,
                    payload: project.users
                });
            })
            .catch(error => dispatch(errorHandler('Bad Request')));
    };
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}