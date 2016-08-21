/**
 * Created by user on 20.08.2016.
 */
import homeService from '../services/homeService';
import * as types from '../constants/HomeActionTypes';
import {getQuery} from "../actions/HomeSearchActions"

export function receiveTotalProjects(total){
    return (dispatch, getState)=>{
        const pagination = getState().HomeReducer.pagination;
        pagination.total = total;
        updatePagination(pagination)
    }
}

export function updatePagination(pagination){
    return {
        type:"PROJECTS_PAGINATION_UPDATE",
        pagination
    }
}

export function receiveUpdatePagination(selected){
    return (dispatch, getState)=>{
        const pagination = getState().HomeReducer.pagination;
        pagination.activePage = selected;
        dispatch(updatePagination(pagination));
        dispatch(getProjects());
    }
}

export function getProjects(){
    return (dispatch, getState)=>{
        dispatch({
            type: types.PROJECTS_GET_ALL_START_LOADING
        });
        const query = getQuery(getState);
        const pagination = getState().HomeReducer.pagination;
        query.recordsPerPage = pagination.perpage;
        query.activePage = pagination.activePage;
        console.info(new Date(), " : ", "sending query ", query);
        return homeService.getProjects(query)
            .then( res => res.json())
            .then( data => {
                dispatch(receiveTotalProjects(data.length));
                //TODO: total projects should come in separated field
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