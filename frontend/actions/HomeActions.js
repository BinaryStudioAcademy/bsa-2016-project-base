import * as types from '../constants/HomeActionTypes';
import homeService from '../services/homeService';

export function filterProjectList(search) {
    return {
        type: types.FILTER_PROJECTS_DETAILS,
        search
    };
}

export function filterTech(filterTech, check) {
    return {
        type: types.FILTER_PROJECTS_BY_TECH_DETAILS,
        filterTech,
        check
    };
}

export function setActionPage(activePage) {
    return {
        type: types.PAGINATION_ACTIVE_PAGE,
        activePage
    }
}

export function getAllProjects() {
    return dispatch => {
        dispatch({
            type: types.PROJECTS_GET_ALL_START_LOADING
        });

        return homeService.getAllProjects()
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

export function getAllProjectsSorted(orderBy) {
    return dispatch => {
        dispatch({
            type: types.PROJECTS_GET_ALL_START_LOADING
        });
        return homeService.getAllFeaturesSorted(orderBy)
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