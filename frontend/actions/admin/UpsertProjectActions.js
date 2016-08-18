import * as types from './UpsertProjectActionTypes';
import upsertProjectService from "../../services/admin/UpsertProjectService";
import adminTagService from "../../services/admin/AdminTagService";



export function getPredefinedData() {
    return dispatch => {
        dispatch({
            type: types.GET_DATA
        });
        return upsertProjectService.getPredefinedData()
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.GET_DATA_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.GET_DATA_ERROR,
                    error: error
                });
            });
    };
};

export function postTag(tag) {
    return dispatch => {
        dispatch({
            type: types.POST_TAG
        });
        return adminTagService.addTag(tag)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.POST_TAG_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.POST_TAG_ERROR,
                    error: error
                });
            });
    };
};




export function changeProjectName(name) {
    return {
        type: types.CHANGE_PROJECT_NAME,
        name
    };
};

export function changeProjectLink(link) {
    return {
        type: types.CHANGE_PROJECT_LINK,
        link
    };
};

export function changeStartDate(date) {
    return {
        type: types.CHANGE_START_DATE,
        date
    };
};

export function changeFinishDate(date) {
    return {
        type: types.CHANGE_FINISH_DATE,
        date
    };
};

export function changeCondition(option) {
    return {
        type: types.CHANGE_CONDITION,
        option
    };
};


export function changeDescription(text) {
    return {
        type: types.CHANGE_DESCRIPTION,
        text
    };
};

export function addUserToProject(_id) {
    return {
        type: types.ADD_USER_TO_PROJECT,
        _id
    };
};

export function removeUserFromProject(_id) {
    return {
        type: types.REMOVE_USER_FROM_PROJECT,
        _id
    };
};

export function changeOwnership(_id, checked) {
    return {
        type: types.CHANGE_OWNERSHIP,
        _id,
        checked
    };
};

export function addTagToProject(_id) {
    return {
        type: types.ADD_TAG_TO_PROJECT,
        _id
    };
};

export function removeTagFromProject(_id) {
    return {
        type: types.REMOVE_TAG_FROM_PROJECT,
        _id
    };
};

export function addNewTagToProject(newTagName) {
    return {
        type: types.ADD_NEW_TAG_TO_PROJECT,
        newTagName
    };
};


export function removeNewTagFromProject(tagName) {
    return {
        type: types.REMOVE_NEW_TAG_FROM_PROJECT,
        tagName
    };
};



export function addTechToProject(_id) {
    return {
        type: types.ADD_TECH_TO_PROJECT,
        _id
    };
};

export function removeTechFromProject(_id) {
    return {
        type: types.REMOVE_TECH_FROM_PROJECT,
        _id
    };
};

export function addNewTechToProject(tech) {
    return {
        type: types.ADD_NEW_TECH_TO_PROJECT,
        tech
    };
};


export function removeNewTechFromProject(tech) {
    return {
        type: types.REMOVE_NEW_TECH_FROM_PROJECT,
        tech
    };
};



