import {toastr} from 'react-redux-toastr';
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
            owners: new Array(),
            users: new Array()
        };

        for(let i in data['users']) request[(data.users[i] ? 'owners' : 'users')].push(i);       
        return usersRightsService.saveProjectUsers(projectId,request)
            .then(response => response.json())
            .then(data =>{
                toastr.success(`Successfully updated`, { timeOut: 10000 });
                usersRightsService.getProjectUsers(projectId,data['nameFilter'],data['usersRight'])
                    .then(responseCurrent => responseCurrent.json())
                    .then(current =>{
                        current['users'] = concatUsers(current['users']);
                        dispatch({
                            type: types.SAVE_PROJECT_USERS,
                            current:current
                        });
                    });
            }).catch( error => {
                toastr.error(`Error while updating`, { timeOut: 10000 });
                dispatch({
                    type: types.SAVE_PROJECT_USERS_ERROR,
                    error
                });
            });
    }
}