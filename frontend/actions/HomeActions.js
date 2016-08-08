import * as types from '../constants/HomeActionTypes';
import featureService from '../services/featureService';

export function getAllProjects() {
    return dispatch => {
        dispatch({
            type: types.PROJECTS_GET_ALL_START_LOADING
        });

        return featureService.getAllProjects()
            .then( res => res.json())
            .then( data => {
                console.log('Get:', data);
                dispatch({
                    type: types.PROJECTS_GET_ALL_SUCCESS,
                    data: data
                });
            })
            .catch( err => {
                dispatch({
                    type: types.PROJECTS_GET_ALL_ERROR,
                    error: err
                });
            });
    }
}