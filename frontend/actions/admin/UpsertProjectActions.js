import * as types from './UpsertProjectActionTypes';
import upsertProjectService from '../../services/admin/UpsertProjectService';
import adminTagService from '../../services/admin/AdminTagService';
import techService from '../../services/TechnologieService';
import uploadService from '../../services/UploadService';
import sectionService from '../../services/sectionService';
import featureService from '../../services/featureService';
import fileThumbService from '../../services/FileThumbService';


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
            .then(json => {
                dispatch({
                    type: types.UP_GET_DATA_SUCCESS,
                    data: json
                });
            })
            .catch(error => {
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
            .then(json => {
                dispatch({
                    type: types.UP_POST_PROJECT_SUCCESS,
                    data: json
                });
            })
            .catch(error => {
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
export function deleteSection(id, sections, feturesToDelete) {
    sections.forEach(function (el, indx) {
        if (el._id === id) {
            sections.splice(indx, 1);
        }
    });
    return dispatch => {

        featureService.removeFeatures(feturesToDelete)
            .catch(error => dispatch(errorHandler('Bad Request')));

        sectionService.removeSection(id)
            .then(dispatch({
                type: types.UP_POST_FEATURE_DELETE,
                data: sections
            }))
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}
export function deleteFeature(id, features) {
    features.forEach(function (el, indx) {
        if (el._id === id) {
            features.splice(indx, 1);
        }
    });

    return dispatch => {
        featureService.removeFeature(id)
            .then(dispatch({
                type: types.UP_POST_FEATURE_DELETE,
                data: features
            }))
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}

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
            .then(json => {
                dispatch({
                    type: types.UP_POST_TAG_SUCCESS,
                    data: json
                });
            })
            .catch(error => {
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
            .then(json => {
                dispatch({
                    type: types.UP_POST_TECH_SUCCESS,
                    iconLoaded: false,
                    data: json
                });
            })
            .catch(error => {
                dispatch({
                    type: types.UP_POST_TECH_ERROR,
                    iconLoaded: false,
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
            .then(json => {
                dispatch({
                    type: types.UP_POST_SECTION_SUCCESS,
                    data: json
                });
            })
            .catch(error => {
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
            .then(json => {
                dispatch({
                    type: types.UP_POST_FEATURE_SUCCESS,
                    data: json
                });
            })
            .catch(error => {
                dispatch({
                    type: types.UP_POST_FEATURE_ERROR,
                    error: error
                });
            });
    };
};


const ICON_MAX_SIZE = 0.5 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

function uploadSuccess(iconLoaded, data, error) {
    return {
        type: types.UP_UPLOAD_ICON_SUCCESS,
        iconLoaded,
        data,
        error
    };
}
export function uploadIcon(file) {
    return dispatch => {
        dispatch({
            type: types.UP_UPLOAD_ICON,
            name: file.name
        });
        if (!FILE_TYPES.includes(file.type)) {
            const data = {
                name: file.name
            }
            const error = 'Unsupported mime type. Allowed ' + FILE_TYPES.join(',');
            dispatch(uploadSuccess(false, data, error));
        } else if (file.size > ICON_MAX_SIZE) {
            const data = {
                name: file.name
            }
            const error = 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (ICON_MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
            dispatch(uploadSuccess(false, data, error));
        } else {
            return uploadService.upload(file)
                .then(response => {
                    if (response.status != 201) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(json => {
                    let data = json;
                    if (!json.hasOwnProperty('error')) {
                        data = fileThumbService.setThumb(json);
                    }

                    dispatch({
                        type: types.UP_UPLOAD_ICON_SUCCESS,
                        iconLoaded: true,
                        data: data
                    });

                })
                .catch(error => {
                    dispatch({
                        type: types.UP_UPLOAD_ICON_ERROR,
                        iconLoaded: false,
                        error: error

                    });
                });
        }
    };
};

const MAX_SIZE = 2 * 1024 * 1024;


export function uploadFile(file) {
    return dispatch => {
        dispatch({
            type: types.UP_UPLOAD_FILE,
            name: file.name
        });
        if (file.size > MAX_SIZE) {
            const data = {
                name: file.name,
                error: 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
            }
            dispatch({
                type: types.UP_UPLOAD_FILE_SUCCESS,
                data: data
            });
        } else {
            return uploadService.upload(file)
                .then(response => {
                    if (response.status != 201) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(json => {
                    let data = json;
                    if (!json.hasOwnProperty('error')) {
                        data = fileThumbService.setThumb(json);
                    }

                    dispatch({
                        type: types.UP_UPLOAD_FILE_SUCCESS,
                        data: data
                    });

                })
                .catch(error => {
                    dispatch({
                        type: types.UP_UPLOAD_FILE_ERROR,
                        error: error

                    });
                });
        }

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
        type: types.UP_CHANGE_STATUS,
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

export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}
