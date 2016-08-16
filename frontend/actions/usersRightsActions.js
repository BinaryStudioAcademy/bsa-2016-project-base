import * as types from '../constants/AdminUserActionTypes';
import adminRightsService from '../services/admin/AdminRightsService';

export function fetchUsers(projectId) {
    return (dispatch) => {
        dispatch({
            type: types.USERS_PROJECT_GET_LOADING
          });
        return adminRightsService.getProjectUsers(projectId)
            .then(response => { console.log('RESPONSE FROM >>>>>>>>getProjectUsers<<<<<< ',response);
             return response.json()})
            .then( data => {
                console.log(data);
                dispatch({
                    type: types.USERS_PROJECT_GET_LOADED,
                    users:{
                        simples:data.simples,
                        owners: data.owners
                    }
                });
            })
    };
}


export function fetchProjects() {
    return (dispatch) => {
        dispatch({
            type: types.PROJECTS_GET_LOADING
          });
        return adminRightsService.getAllProjects()
            .then(response => { console.log('RESPONSE FROM  **********getAllProjects********** ',response); return response.json()})
            .then( data => {
              let projectsList=[];


                          for(var i in data){
            projectsList.push({
            id: data[i]._id,
            projectName: data[i].projectName
                })
                }
                console.log("data here:",data);
                dispatch({
                    type: types.PROJECTS_GET_LOADED,
                    projectsList:projectsList

                });
            })
    };
}
