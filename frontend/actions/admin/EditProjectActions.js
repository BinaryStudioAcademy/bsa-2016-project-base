import * as types from './EditProjectActionsTypes';
import upsertProjectService from '../../services/admin/UpsertProjectService';
import editProjectService from '../../services/admin/EditProjectService';
import adminTagService from '../../services/admin/AdminTagService';
import techService from '../../services/TechnologieService';
import uploadService from '../../services/UploadService';
import sectionService from '../../services/sectionService';
import featureService from '../../services/featureService';
import fileThumbService from '../../services/FileThumbService';



export function getPredefinedData() {
    return dispatch => {
        dispatch({
            type: types.UP_GET_DATA_ED
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
                    type: types.UP_GET_DATA_SUCCESS_ED,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_GET_DATA_ERROR_ED,
                    error: error
                });
            });
    };
};

export function updateProject(project, errors) {

    if(errors.nameError || errors.technologiesError || errors.timeBeginError || errors.usersError || errors.timeEndError) {
        return dispatch => {
            dispatch(errorHandler('Bad Request!'));
            dispatch({
                type: "UP_POST_PROJECT_ERROR_ED",
                error: errors,
            });
        };
    }

    return dispatch => {
        dispatch({
            type: types.UP_POST_PROJECT_ED
        });
        return editProjectService.updateProjectService(project)
            .then(response => {
                return response.json()
                    .then(json => {
                        if(response.ok) {
                            dispatch({
                                type: types.UP_POST_PROJECT_SUCCESS_ED,
                                data: json,
                                error: errors,
                            });
                            return json;
                        }
                        else {
                            return Promise.reject(json);
                        }
                    })
                    .catch(error => {
                        dispatch({
                            type: types.UP_POST_PROJECT_ERROR_ED,
                            error: errors
                        });
                        dispatch(errorHandler('Bad Request!'));
                    });
            });
    };
};



export function createProjectData() {
    return {
        type: types.UP_CREATE_PROJECT_DATA_ED
    };
};


export function postTag(tag) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_TAG_ED
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
                    type: types.UP_POST_TAG_SUCCESS_ED,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_TAG_ERROR_ED,
                    error: error
                });
            });
    };
};

export function postTech(tech) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_TECH_ED
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
                    type: types.UP_POST_TECH_SUCCESS_ED,
                    iconLoaded: false,
                    data: json
                });
            })
            .catch(error => {
                dispatch({
                    type: types.UP_POST_TECH_ERROR_ED,
                    iconLoaded: false,
                    error: error
                });
            });
    };
};


export function postSection(section) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_SECTION_ED
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
                    type: types.UP_POST_SECTION_SUCCESS_ED,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_SECTION_ERROR_ED,
                    error: error
                });
            });
    };
};




export function postFeature(feature) {
    return dispatch => {
        dispatch({
            type: types.UP_POST_FEATURE_ED
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
                    type: types.UP_POST_FEATURE_SUCCESS_ED,
                    data: json
                });
            })
            .catch( error => {
                dispatch({
                    type: types.UP_POST_FEATURE_ERROR_ED,
                    error: error
                });
            });
    };
};



const ICON_MAX_SIZE = 0.5 * 1024 * 1024;
const IMG_TYPES = ['.jpeg', '.jpg', '.png', '.gif'];
const MAX_SIZE = 10 * 1024 * 1024;
const FILE_TYPES = ['.jpeg', '.jpg', '.png', '.gif', '.txt','.xml','.xlsx','.xls','.doc','.docx','.pdf','.zip','.rar'];


function uploadFileValidation(data, target) {
    return {
        type: types.UP_UPLOAD_FILE_SUCCESS_ED,
        data: data,
        target
    };
}
export function uploadFile(file, target='file') {
    const name = file.name;
    const ext = name.slice(name.lastIndexOf('.'),name.legth);
    const allowedTypes = (target === 'file') ? FILE_TYPES : IMG_TYPES;
    console.log('ext',ext);
    return dispatch => {
        dispatch({
            type: types.UP_UPLOAD_FILE_ED,
            name: file.name,
            target
        });
        if (!allowedTypes.includes(ext)) {
            const data = {
                name: file.name,
                error: 'Unsupported file type. Allowed ' + allowedTypes.join('/')
            }
            //const data = {
            //    name: file.name
            //}
            //const error = 'Unsupported file type. Allowed ' + FILE_TYPES.join(',');
            dispatch(uploadFileValidation(data,target));
        } else if (file.size > MAX_SIZE) {
            const data = {
                name: file.name,
                error: 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
            }
            //const data = {
            //    name: file.name
            //}
            //const error = 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
            dispatch(uploadFileValidation(data,target));
            /*} else {

             if (file.size > MAX_SIZE) {
             const data = {
             name: file.name,
             error: 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
             }
             dispatch({
             type: types.UP_UPLOAD_FILE_SUCCESS,
             data: data,
             target
             });*/
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
                        type: types.UP_UPLOAD_FILE_SUCCESS_ED,
                        data: data,
                        target
                    });

                })
                .catch(error => {
                    dispatch({
                        type: types.UP_UPLOAD_FILE_ERROR_ED,
                        error: error,
                        target

                    });
                });
        }

    };
};

export function setVisibleUploadByLinkScreenshoots(hideFile, hideForm) {
    return {
        type: types.SET_VISIBLE_FORM_BY_LINK_SCREENSHOOTS_ED,
        hideFileScreenshoots: hideFile,
        hideFormScreenshoots: hideForm
    }
}

export function deleteSection(id, sections, feturesToDelete,featuresToStay) {
    sections.forEach(function (el, indx) {
        if (el._id === id) {
            sections.splice(indx, 1);
        }
    });
    return dispatch => {

        featureService.removeFeatures(feturesToDelete)
            .then(dispatch({
                type: types.UP_POST_FEATURE_DELETE_ED,
                data: featuresToStay
            }))
            .catch(error => dispatch(errorHandler('Bad Request')));

        sectionService.removeSection(id)
            .then(dispatch({
                type: types.UP_POST_SECTION_DELETE_ED,
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
                type: types.UP_POST_FEATURE_DELETE_ED,
                data: features
            }))
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}

export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG_ED',
        error: error
    }
}

export function selectUser(userId) {
    return {
        type: 'UP_SELECT_USER_ED',
        userId
    }
}

export function setUserStartDate(userId, date) {
    return {
        type: 'UP_SET_USER_START_DATE_ED',
        userId,
        date
    }
}

export function setUserEndDate(userId, date) {
    return {
        type: 'UP_SET_USER_END_DATE_ED',
        userId,
        date
    }
}

export function removeFile(name) {
    return {
        type: types.UP_REMOVE_FILE_ED,
        name
    };
};

export function changeProjectName(name) {
    return {
        type: types.UP_CHANGE_PROJECT_NAME_ED,
        name
    };
};

export function changeProjectLink(link) {
    return {
        type: types.UP_CHANGE_PROJECT_LINK_ED,
        link
    };
};

export function changeStartDate(date) {
    return {
        type: types.UP_CHANGE_START_DATE_ED,
        date
    };
};

export function changeFinishDate(date) {
    return {
        type: types.UP_CHANGE_FINISH_DATE_ED,
        date
    };
};

export function changeCondition(option) {
    return {
        type: types.UP_CHANGE_CONDITION_ED,
        option
    };
};

export function changeDescription(text) {
    return {
        type: types.UP_CHANGE_DESCRIPTION_ED,
        text
    };
};

export function addUserToProject(_id) {
    return {
        type: types.UP_ADD_USER_TO_PROJECT_ED,
        _id
    };
};

export function removeUserFromProject(_id) {
    return {
        type: types.UP_REMOVE_USER_FROM_PROJECT_ED,
        _id
    };
};

export function changeOwnership(_id, checked) {
    return {
        type: types.UP_CHANGE_OWNERSHIP_ED,
        _id,
        checked
    };
};

export function addTagToProject(_id) {
    return {
        type: types.UP_ADD_TAG_TO_PROJECT_ED,
        _id
    };
};

export function removeTagFromProject(_id) {
    return {
        type: types.UP_REMOVE_TAG_FROM_PROJECT_ED,
        _id
    };
};

export function addTechToProject(_id) {
    return {
        type: types.UP_ADD_TECH_TO_PROJECT_ED,
        _id
    };
};

export function removeTechFromProject(_id) {
    return {
        type: types.UP_REMOVE_TECH_FROM_PROJECT_ED,
        _id
    };
};


export function selectSection(_id) {
    return {
        type: types.UP_SELECT_SECTION_ED,
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
        type: "CLEAN_STORE_ED",
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

export function initialStateTechnologies(technologies, predefinedTechnologies) {
    var technologiesId = technologies.map(function(el) {
        return el._id
    });
    var predefinedTechnologiesId = predefinedTechnologies.map(function(el) {
        return el._id
    });
    const action = {
        type: 'INITIAL_STATE_TECHNOLOGIES',
        predefinedTechnologies: predefinedTechnologies.map(function(el, index) {
            if (technologiesId.indexOf(predefinedTechnologiesId[index]) != -1) {
                return Object.assign({}, el, {inProject: true})
            }
            else {
                return el;
            }
        }),
    };
    return action;
}

export function initialStateFiles() {
    return dispatch => {
        dispatch({
            type: "INITIAL_STATE_FI",
            name: file.name
        });
        const data = {
            name: file.name,
            error: 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
        }
        dispatch({
            type: types.UP_UPLOAD_FILE_SUCCESS_ED,
            data: data
        });
    }
}

export function initialStateF(files) {
    const action = {
        type: 'INITIAL_STATE_FI',
        files: files.map(function(el) {
            return Object.assign({}, el, { good: true}, {ready: true})
        })
    };
    return action;
}

export function initialStateUsers(users, predefinedUsers, owners) {
    var usersId = users.map(function(el) {
        return el._id
    });
    var predefinedUsersId = predefinedUsers.map(function(el) {
        return el._id
    });
    var ownersLogins = owners.map(function(el) {
        return el.login;
    });
    const action = {
        type: 'INITIAL_STATE_USERS',
        predefinedUsers: predefinedUsers.map(function(el, index) {
            if (usersId.indexOf(predefinedUsersId[index]) != -1) {
                if(ownersLogins.indexOf(el.login) != -1) {
                    return Object.assign({}, el, {inProject: true}, {owner: true})
                } else {
                    return Object.assign({}, el, {inProject: true})
                }

            }
            else {
                return el;
            }
        }),
    };
    return action;
}

export function setVisibleUploadByLinkAttachments(hideFile, hideForm) {
    return {
        type: types.SET_VISIBLE_FORM_BY_LINK_ATTACHMENTS_ED,
        hideFile: hideFile,
        hideForm: hideForm
    }
}

export function setVisibleAddTechForm(hideTechForm) {
    console.log('action');
    console.log(hideTechForm);
    return {
        type: types.SET_VISIBLE_ADD_TECH_FORM_ED,
        hideTechForm: hideTechForm
    }
}

export function initialStateSections(features) {

    const action = {
        type: 'INITIAL_STATE_SECTIONS',
        sections: features.map(function(el)  {
            return el.section;
                    }),
    };
    return action;
}

function uploadSuccess(iconLoaded,data,error) {
    return {
        type: types.UP_UPLOAD_ICON_SUCCESS_ED,
        iconLoaded,
        data,
        error
    };
}

function uploadIconValidation(iconLoaded, data, error) {
    return {
        type: types.UP_UPLOAD_ICON_SUCCESS_ED,
        iconLoaded,
        data,
        error
    };
}
export function uploadIcon(file) {
    const name = file.name;
    const ext = name.slice(name.lastIndexOf('.'),name.legth);

    return dispatch => {
        dispatch({
            type: types.UP_UPLOAD_ICON_ED,
            name: file.name
        });

        if (!IMG_TYPES.includes(ext)) {
            const data = {
                name: file.name
            }
            const error = 'Unsupported file type. Allowed ' + IMG_TYPES.join('/');
            dispatch(uploadIconValidation(false, data, error));
        } else if (file.size > ICON_MAX_SIZE) {
            const data = {
                name: file.name
            }
            const error = 'File size is ' + (file.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + (ICON_MAX_SIZE / 1024 / 1024).toFixed(2) + ' MB.'
            dispatch(uploadIconValidation(false, data, error));
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
                        type: types.UP_UPLOAD_ICON_SUCCESS_ED,
                        iconLoaded: true,
                        data: data
                    });

                })
                .catch(error => {
                    dispatch({
                        type: types.UP_UPLOAD_ICON_ERROR_ED,
                        iconLoaded: false,
                        error: error

                    });
                });
        }
    };
};

export function uploadFileByLinkAddProject(link, target='file') {
    const ext =  link.slice(link.lastIndexOf('.'));
    let name = link.slice(link.lastIndexOf('/')+1,link.lastIndexOf('.'));
    const allowedTypes = (target === 'file') ? FILE_TYPES : IMG_TYPES;
    return dispatch=> {
        dispatch({
            type: types.UP_UPLOAD_FILE_ED,
            name: name,
            target
        });

        if (!allowedTypes.includes(ext)) {
            const data = {
                name: name,
                error: 'Unsupported file type. Allowed ' + allowedTypes.join('/')
            }
            dispatch(uploadFileValidation(data,target));
        }else{
            return uploadService.uploadFileByLinkAttachments(link)
                .then(response => {
                    if (response.status != 200) {
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
                        type: types.UP_UPLOAD_FILE_SUCCESS_ED,
                        data: data,
                        target
                    });

                })
                .catch(error => {
                    dispatch({
                        type: types.UP_UPLOAD_FILE_ERROR_ED,
                        error: error,
                        target

                    });
                });
        }

    }
}

export function setContactFieldData(field, data) {
    return {
        type: 'UP_SET_CONTACT_FIELD_ED',
        field,
        data
    }
}

export function setLocation(position) {
    return {
        type: 'UP_SET_LOCATION_ED',
        position
    }
}


