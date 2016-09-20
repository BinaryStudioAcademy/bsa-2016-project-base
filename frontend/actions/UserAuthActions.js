import userAuthService from '../services/userAuthService';
import * as types from '../constants/UserAuthActionTypes';

export function setAuthUser(serverUID,userRole){
    return (dispatch) => {
        dispatch({
            type: types.SET_AUTH_USER_START_LOADING,
            user:{
                userEmail: serverUID,
                userRole: userRole
            }
        });
        return userAuthService.getAuthUser(serverUID)
            .then(response => response.json())
            .then(user => {
                dispatch({
                    type: types.SET_AUTH_USER_END_LOADING,
                    user
                });
            }).catch(error => {
                dispatch({
                    type: types.SET_AUTH_USER_ERROR_LOADING,
                    error
                });
            });
    };
    /*return {
        type: 'SET_AUTH_USER',
        user:{
            userEmail: serverUID,
            userRole: userRole
        }
    }*/
}