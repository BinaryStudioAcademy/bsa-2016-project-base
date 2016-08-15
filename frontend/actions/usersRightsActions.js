import * as types from '../constants/AdminUserActionTypes';
import adminRightsService from '../services/admin/AdminRightsService';

export function fetchUsers(projectId) {
    return (dispatch) => {
        dispatch({
            type: types.USERS_PROJECT_GET_LOADING
          });
        return adminRightsService.getProjectUsers(projectId)
            .then(response => { console.log(response); return response.json()})
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
