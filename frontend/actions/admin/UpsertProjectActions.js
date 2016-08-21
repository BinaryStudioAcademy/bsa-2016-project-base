import * as types from './UpsertProjectActionTypes';
import upsertProjectService from '../../services/admin/UpsertProjectService';
import adminTagService from '../../services/admin/AdminTagService';
import techService from '../../services/TechnologieService';
import uploadService from '../../services/UploadService';
import sectionService from '../../services/sectionService';
import featureService from '../../services/featureService';




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
            type: types.ADD_TAG
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
                    type: types.ADD_TAG_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.ADD_TAG_ERROR,
                    error: error
                });
            });
    };
};

export function postTech(tech) {
    return dispatch => {
        dispatch({
            type: types.ADD_TECH
        });
        return techService.addTechology(tech)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.ADD_TECH_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.ADD_TECH_ERROR,
                    error: error
                });
            });
    };
};


export function postSection(section) {
    return dispatch => {
        dispatch({
            type: types.ADD_SECTION
        });
        return sectionService.addNewSection(section)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.ADD_SECTION_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.ADD_SECTION_ERROR,
                    error: error
                });
            });
    };
};


export function postFeature(feature) {
    return dispatch => {
        dispatch({
            type: types.ADD_FEATURE
        });
        return featureService.addNewFeature(feature)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.ADD_FEATURE_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.ADD_FEATURE_ERROR,
                    error: error
                });
            });
    };
};


export function uploadFile(file) {
    return dispatch => {
        dispatch({
            type: types.UPLOAD_FILE
        });
        return uploadService.upload(file)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                } 
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.UPLOAD_FILE_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UPLOAD_FILE_ERROR,
                    error: error
                });
            });
    };
};


export function removeFile(name) {
    return {
        type: types.REMOVE_FILE,
        name
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


export function selectSection(_id) {
    return {
        type: types.SELECT_SECTION,
        _id
    };
};