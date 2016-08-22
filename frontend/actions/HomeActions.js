/**
 * Created by user on 20.08.2016.
 */
import homeService from '../services/homeService';
import * as types from '../constants/HomeActionTypes';

export function startGet(){
    return {
        type: types.PROJECTS_GET_ALL_START_LOADING
    }
}
export function endGet(data){
    return {
        type: types.PROJECTS_GET_ALL_SUCCESS,
        data: data
    }
}
export function errorGet(err){
    return {
        type: types.PROJECTS_GET_ALL_ERROR,
        error: err
    }
}
