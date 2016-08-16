import adminTagService from "../../services/admin/AdminTagService";
import * as types from './AdminTagActionTypes';


export function getTags() {
    return dispatch => {
        dispatch({
            type: types.GET_TAGS
        });
        return adminTagService.getAllTags()
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.GET_TAGS_SUCCESS,
                    data: json
                });
                dispatch(filterTags()); 
            })
            .catch( error => {
                dispatch({
                    type: types.GET_TAGS_ERROR,
                    error: error
                });
            });
    };
};

export function deleteTags(tags) {
    return dispatch => {
        dispatch({
            type: types.DELETE_TAGS
        });
        return adminTagService.deleteTags(tags)
            .then(response => {
                if (response.status != 200) {
                    throw Error(response.statusText);
                } 
                dispatch({
                    type: types.DELETE_TAGS_SUCCESS
                });
                return dispatch(getTags());
            })
            .catch( error => {
                dispatch({
                    type: types.DELETE_TAGS_ERROR,
                    error: error
                });
            });
    };
};

export function addTag(tag) {
    return dispatch => {
        dispatch({
            type: types.POST_TAG
        });
        return adminTagService.addTag(tag)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                dispatch({
                    type: types.POST_TAG_SUCCESS
                });
                return dispatch(getTags());
            })
            .catch( error => {
                dispatch({
                    type: types.POST_TAG_ERROR,
                    error: error
                });
            });
    };
};


export function selectOne(id, checked) {
    return {
        type: types.SELECT_ONE,
        id,
        checked
    };
};

export function selectAll(checked) {
    return dispatch => {
        dispatch({
            type: types.SELECT_ALL,
            checked
        });
        dispatch(filterTags());
    };
};

export function setTagName(tagNameToAdd) {
    return {
        type: types.SET_TAG_NAME,
        tagNameToAdd
    };
};

export function setFilterTerm(searchTerm){
    return {
        type: types.SET_FILTER_TERM,
        searchTerm
    };
}; 

export function filterTags(){
    return {
        type: types.FILTER_TAGS
    };
}; 