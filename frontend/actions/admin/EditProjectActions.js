import * as types from './UpsertProjectActionTypes';
import upsertProjectService from '../../services/admin/UpsertProjectService';
import editProjectService from '../../services/admin/EditProjectService';
import adminTagService from '../../services/admin/AdminTagService';
import techService from '../../services/TechnologieService';
import uploadService from '../../services/UploadService';
import sectionService from '../../services/sectionService';
import featureService from '../../services/featureService';




export function getPredefinedData() {
    return dispatch => {
        dispatch({
            type: types.UP_GET_DATA
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
                    type: types.UP_GET_DATA_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_GET_DATA_ERROR,
                    error: error
                });
            });
    };
};

export function postProject(project) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_PROJECT
        });
        return upsertProjectService.addProject(project)
            .then(response => {
                if (response.status != 201) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( json =>  {
                dispatch({
                    type: types.UP_POST_PROJECT_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_PROJECT_ERROR,
                    error: error
                });
            });
    };
};



export function createProjectData() {
    return {
        type: types.UP_CREATE_PROJECT_DATA
    };
};


export function postTag(tag) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_TAG
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
                    type: types.UP_POST_TAG_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_TAG_ERROR,
                    error: error
                });
            });
    };
};

export function postTech(tech) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_TECH
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
                    type: types.UP_POST_TECH_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_TECH_ERROR,
                    error: error
                });
            });
    };
};


export function postSection(section) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_SECTION
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
                    type: types.UP_POST_SECTION_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_SECTION_ERROR,
                    error: error
                });
            });
    };
};




export function postFeature(feature) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_FEATURE
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
                    type: types.UP_POST_FEATURE_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_FEATURE_ERROR,
                    error: error
                });
            });
    };
};





export function uploadFile(file) {
    return dispatch => {
        dispatch({
            type: types.UP_UPLOAD_FILE
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
                    type: types.UP_UPLOAD_FILE_SUCCESS,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_UPLOAD_FILE_ERROR,
                    error: error
                });
            });
    };
};


export function removeFile(name) {
    return {
        type: types.UP_REMOVE_FILE,
        name
    };
};

export function changeProjectName(name) {
    return {
        type: types.UP_CHANGE_PROJECT_NAME,
        name
    };
};

export function changeProjectLink(link) {
    return {
        type: types.UP_CHANGE_PROJECT_LINK,
        link
    };
};

export function changeStartDate(date) {
    return {
        type: types.UP_CHANGE_START_DATE,
        date
    };
};

export function changeFinishDate(date) {
    return {
        type: types.UP_CHANGE_FINISH_DATE,
        date
    };
};

export function changeCondition(option) {
    return {
        type: types.UP_CHANGE_CONDITION,
        option
    };
};

export function changeDescription(text) {
    return {
        type: types.UP_CHANGE_DESCRIPTION,
        text
    };
};

export function addUserToProject(_id) {
    return {
        type: types.UP_ADD_USER_TO_PROJECT,
        _id
    };
};

export function removeUserFromProject(_id) {
    return {
        type: types.UP_REMOVE_USER_FROM_PROJECT,
        _id
    };
};

export function changeOwnership(_id, checked) {
    return {
        type: types.UP_CHANGE_OWNERSHIP,
        _id,
        checked
    };
};

export function addTagToProject(_id) {
    return {
        type: types.UP_ADD_TAG_TO_PROJECT,
        _id
    };
};

export function removeTagFromProject(_id) {
    return {
        type: types.UP_REMOVE_TAG_FROM_PROJECT,
        _id
    };
};

export function addTechToProject(_id) {
    return {
        type: types.UP_ADD_TECH_TO_PROJECT,
        _id
    };
};

export function removeTechFromProject(_id) {
    return {
        type: types.UP_REMOVE_TECH_FROM_PROJECT,
        _id
    };
};


export function selectSection(_id) {
    return {
        type: types.UP_SELECT_SECTION,
        _id
    };
};

export function initialStateFromDB(projectId) {
    return dispatch => {
        return editProjectService.getByAllData(projectId)
            .then(res=>res.json())
            .then(res=>{
                dispatch ({
                    type: 'INITIAL_STATE_FROM_DB',
                    project: res,
                })})
            .catch( err => {
                dispatch(errorHandler('Bad Request'));
            });
    };
}

export function cleanStore() {
    const action = {
        type: "CLEAN_STORE",
    }
    return action;
}

export function initialStateTags(tags, predefinedTags) {
    var tagsId = tags.map(function(el) {
        return el._id
    });
    var pretagsId = predefinedTags.map(function(el) {
        return el._id
    });
    const action = {
        type: 'INITIAL_STATE_TAGS',
        predefinedTags: predefinedTags.map(function(el, index) {
            if (tagsId.indexOf(pretagsId[index]) != -1) {
                return Object.assign({}, el, {inProject: true})
            }
            else {
                return el;
            }
        }),
    };
return action;
}