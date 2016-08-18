import * as types from '../../constants/UsersRightsActionTypes';
import usersRightsService from '../../services/admin/UsersRightsService';

export function fetchUsers(projectId,nameFilter,usersRight) {
    return (dispatch) => {
        dispatch({ type: types.USERS_PROJECT_START_LOADING });
        return usersRightsService.getProjectUsers(projectId,nameFilter,usersRight)
            .then(response => response.json())
            .then(current => {
                let users = {};
                for(var i in current.users['simples'])
                    users[current['users'].simples[i]._id] = {
                        isOwner: false,
                        userName: current['users'].simples[i].userName,
                        userSurname : current['users'].simples[i].userSurname
                }
                for(var i in current.users['owners'])
                    users[current['users'].owners[i]._id] = {
                        isOwner: true,
                        userName: current['users'].owners[i].userName,
                        userSurname : current['users'].owners[i].userSurname
                }
                 current['users'] = users;
                 dispatch({
                    type: types.USERS_PROJECT_END_LOADING,
                    filters: {
                        name:nameFilter,
                        usersRight
                    },current: current
                });
            }).catch(error => {
                dispatch({
                    type: types.USERS_PROJECT_LOADING_ERROR,
                    error
                });
            });    
    };
}
export function fetchProjectsList(){
    return (dispatch) => {
        dispatch({ type: types.PROJECTS_LIST_START_LOADING });
        return usersRightsService.getProjectsList()
            .then(response => response.json())
            .then(projectsList => {
                dispatch({
                    type: types.PROJECTS_LIST_END_LOADING,
                    projectsList
                });
            }).catch( error => {
                dispatch({
                    type: types.PROJECTS_LIST_ERROR_LOADING,
                    error
                });
            });
    };
}
export function updateUserRight(key,value){
    return {
        type: types.UPDATE_USER_RIGHT,
        key: key,
        value: value 
    }
}
export function saveProjectUsers(projectID,data){
    let request = {
        usersRight: data['usersRight'],
        owners:[],
        simples:[]
    };
    for(var i in data['users'])
        if(data.users[i].isOwner) owners.push(i);
        else simples.push(i);

    return usersRightsService.saveProjectUsers(projectId,request)
        .then(response => response.json())
        .then(data =>{
            dispatch ({ type: types.SAVE_PROJECT_USERS });
        }).catch( err => {
            dispatch({
                type: types.SAVE_PROJECT_USERS_ERROR,
                error
            });
        });
}