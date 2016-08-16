import * as types from '../../constants/UsersRightsActionTypes';
import usersRightsService from '../../services/admin/UsersRightsService';

export function fetchUsers(projectId,filter,marker) {
    return (dispatch) => {
        dispatch({
            type: types.USERS_PROJECT_START_LOADING
        });
        return usersRightsService.getProjectUsers(projectId,filter,marker)
            .then(response =>  response.json())
            .then(data => {
                dispatch({
                    type: types.USERS_PROJECT_END_LOADING,
                    projectId: data['id'],
                    users: {
                        simples:data['simples'],
                        owners: data['owners']
                    }
                });
            }).catch( err => {
                dispatch({
                    type: types.USERS_PROJECT_LOADING_ERROR,
                    error: err
                });
            });
    };
}
export function fetchProjectsList(){
    return (dispatch) => {
        dispatch({
            type: types.PROJECTS_LIST_START_LOADING
        });
        return usersRightsService.getProjectsList()
            .then(response =>  response.json())
            .then(data => {
                dispatch({
                    type: types.PROJECTS_LIST_END_LOADING,
                    projectsList: data
                });
            }).catch( err => {
                dispatch({
                    type: types.PROJECTS_LIST_ERROR_LOADING,
                    error: err
                });
            });
    };
}

export function saveProjectUsers(projectID,users){
    return usersRightsService.saveProjectUsers(projectId,users)
            .then(res=>res.json())
            .then(res=>{
                dispatch ({
                    type: types.SAVE_PROJECT_USERS
                })})
            .catch( err => {
                dispatch({
                    type: types.SAVE_PROJECT_USERS_ERROR,
                    error: err
                });
            });
}