import reviewService from '../services/reviewService';
import * as types from '../constants/ReviewActionTypes';

export function setSelectedProject(selectedProject) {
    return {
        type: types.REVIEW_SET_SELECTED_PROJECT,
        selectedProject
    }
}

export function getAllProjects() {
    return dispatch => {
        dispatch({
            type: types.REVIEW_GET_ALL_PROJECTS_LOADING
        });
        return reviewService.getAllProjects()
            .then( res => res.json())
            .then( data => {
                dispatch({
                    type: types.REVIEW_GET_ALL_PROJECTS_SUCCESS,
                    data: data
                });
            })
            .catch( err => {
                dispatch({
                    type: types.REVIEW_GET_ALL_PROJECTS_ERROR,
                    error: err
                });
            });
    }
}

export function getProject(id) {
    return dispatch => {
        dispatch({
            type: types.REVIEW_GET_PROJECT_LOADING
        });
        return reviewService.getProject(id)
            .then( res => res.json())
            .then( data => {
                dispatch({
                    type: types.REVIEW_GET_PROJECT_SUCCESS,
                    data: data
                });
            })
            .catch( err => {
                dispatch({
                    type: types.REVIEW_GET_ALL_PROJECTS_ERROR,
                    error: err
                });
            });
    }
}