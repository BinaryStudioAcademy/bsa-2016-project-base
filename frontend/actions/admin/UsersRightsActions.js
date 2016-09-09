import * as types from '../../constants/UsersRightsActionTypes';
import usersRightsService from '../../services/admin/UsersRightsService';

var concatUsers = function(data){
    let users = {},concat = function(marker,flag){
        for(let i in data[marker]) 
        users[data[marker][i]._id] = {
            isOwner: flag,
            userName: data[marker][i].userName,
            userSurname : data[marker][i].userSurname,
            position: data[marker][i].position
        };
    };
    concat('simples',false);
    concat('owners',true);
    return users;
}

export function fetchUsers(projectId,nameFilter,usersRight) {
    return (dispatch) => {
        dispatch({ type: types.USERS_PROJECT_START_LOADING });
        return usersRightsService.getProjectUsers(projectId,nameFilter,usersRight)
            .then(response => response.json())
            .then(current => {
                 current['users'] = concatUsers(current['users']);
                 dispatch({
                    type: types.USERS_PROJECT_END_LOADING,
                    filters: {
                        name:nameFilter,
                        usersRight: usersRight
                    },
                    current: current
                });
            }).catch(error => {
                dispatch({
                    type: types.USERS_PROJECT_LOADING_ERROR,
                    error
                });
            });    
    };
}
export function fetchProjectsList(onLoadUsersByFirstPage){
    return (dispatch) => {
        dispatch({ type: types.PROJECTS_LIST_START_LOADING });
        return usersRightsService.getProjectsList()
            .then(responseProjectsList => responseProjectsList.json())
            .then(projectsList => {
                 if(onLoadUsersByFirstPage && projectsList.length){
                    usersRightsService.getProjectUsers(projectsList[0].id)
                    .then(responseCurrent => responseCurrent.json())
                    .then(current =>{
                        current['users'] = concatUsers(current['users']);
                        dispatch({
                            type: types.INITIALIZE_END_LOADING,
                            projectsList: projectsList,
                            current:current
                        });
                    });
                }else dispatch({
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
export function saveProjectUsers(projectId,data){
    return (dispatch) => {
        let request = {
            usersRight: data['usersRight'],
            owners: new Array(),
            simples:new Array()
        };

        for(var i in data['users']){
            if(data.users[i].isOwner) request['owners'].push(i);
            else request['simples'].push(i);   
        }
            
        return usersRightsService.saveProjectUsers(projectId,request)
            .then(response => response.json())
            .then(data =>{
                dispatch ({ type: types.SAVE_PROJECT_USERS });
            }).catch( error => {
                dispatch({
                    type: types.SAVE_PROJECT_USERS_ERROR,
                    error
                });
            });
    }
}