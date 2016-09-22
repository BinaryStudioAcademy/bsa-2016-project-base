import * as types from '../../actions/admin/EditProjectActionsTypes';
import fileThumbService from '../../services/FileThumbService';

export default function EditProjectReducer(state = initialState, action) {
    switch (action.type) {
        case types.UP_GET_DATA_SUCCESS_ED: {
            const {users, tags, technologies, conditions } = action.data;
            return Object.assign({}, state, {
                predefinedUsers: users,
                predefinedTags: tags,
                predefinedTechnologies: technologies,
                predefinedConditions: conditions
            });
        }

        case types.UP_ADD_USER_TO_PROJECT_ED: {
            const {_id} = action;
            const {predefinedUsers,userStory,timeBegin,timeEnd} = state;
            return Object.assign({}, state, {
                predefinedUsers: addUserToProject(predefinedUsers, _id),
                userStory: updateUserStory(userStory,_id,timeBegin,timeEnd,null)
            });
        }

        case types.UP_REMOVE_USER_FROM_PROJECT_ED: {
            const {_id} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: removeUserFromProject(predefinedUsers, _id)
            });
        }
        case types.UP_CHANGE_OWNERSHIP_ED: {
            const {_id, checked} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: changeOwnership(predefinedUsers, _id, checked)
            });
        }
        case types.UP_CHANGE_PROJECT_NAME_ED: {
            const {name} = action;
            return Object.assign({}, state, {
                projectName: name
            });
        }
        case types.UP_CHANGE_PROJECT_LINK_ED: {
            const {link} = action;
            return Object.assign({}, state, {
                projectLink: link
            });
        }
        case types.UP_CHANGE_START_DATE_ED: {
            const {date} = action;
            const {userStory,timeEnd,timeBegin} = state;
            return Object.assign({}, state, {
                timeBegin: updateProjectStartDate(date, timeEnd, timeBegin),
                userStory: updateUserStory(userStory,null,date,null,null)
            });
        }
        case types.UP_CHANGE_FINISH_DATE_ED: {
            const {date} = action;
            const {userStory,timeBegin,timeEnd} = state;
            return Object.assign({}, state, {
                timeEnd: updateProjectEndDate(timeBegin, date,timeEnd),
                userStory: updateUserStory(userStory,null,null,date,null)
            });
        }
        case types.UP_CHANGE_CONDITION_ED: {
            const {option} = action;
            return Object.assign({}, state, {
                status: option
            });
        }
        case types.UP_CHANGE_DESCRIPTION_ED: {
            const {text} = action;
            return Object.assign({}, state, {
                description:{
                    descrFullText:text
                }
            });
        }
        case types.UP_ADD_TAG_TO_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: addTagToProject(predefinedTags, _id)
            });
        }
        case types.UP_REMOVE_TAG_FROM_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: removeTagFromProject(predefinedTags, _id)
            });
        }
        case "UPDATE_PROJECT_SUCCESS": {
            const {data} = action;
            const {added} = state;
            return Object.assign({}, state, {
                added: true
            });
        }
        case types.UP_POST_TAG_SUCCESS_ED: {
            const {data} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: addNewTag(predefinedTags, data)
            });
        }
        case types.UP_POST_TECH_SUCCESS_ED: {
            const {data, iconLoaded} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: addNewTech(predefinedTechnologies, data),
                iconLoaded
            });
        }
        case types.UP_POST_SECTION_SUCCESS_ED: {
            const {data} = action;
            const {sections} = state;
            return Object.assign({}, state, {
                sections: sections.concat(data)
            });
        }
        case types.UP_POST_FEATURE_SUCCESS_ED: {
            const {data} = action;
            const {features} = state;
            console.log('POST_FEATURE_SUCCESS',data);
            return Object.assign({}, state, {
                features: features.concat(data)
            });
        }

        case types.UP_POST_FEATURE_DELETE_ED: {
            const {data} = action;
            const {features} = state;
            return Object.assign({}, state, {
                features: [].concat(data)
            });
        }
        case types.UP_SELECT_SECTION_ED: {
            const {_id} = action;
            const {sections, activeSection} = state;
            return Object.assign({}, state, {
                activeSection: selectSection(sections, _id)
            });
        }
        case types.UP_UPLOAD_FILE_ED: {
            const {name, target} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: files.concat({
                    name,
                    good:true,
                    ready: false,
                    target
                })
            });
        }
        case types.UP_UPLOAD_FILE_SUCCESS_ED: {
            const {data,target} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: updateFileSuccess(files, data, target)
            });
        }
        case types.UP_REMOVE_FILE_ED: {
            const {name} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: removeFile(files, name)
            });
        }
        case types.UP_REMOVE_NEW_TAG_FROM_PROJECT_ED: {
            const {tagName} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeNewTagFromProject(tags, tagName)
            });
        }
        case types.UP_ADD_TECH_TO_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: addTechToProject(predefinedTechnologies, _id)
            });
        }
        case types.UP_SET_CONTACT_FIELD_ED: {
            const {field, data} = action;
            const {contacts} = state;
            return Object.assign({}, state, {
                contacts: {
                    ...contacts,
                    [field]: data
                }
            });
        }
        case types.UP_POST_PROJECT_SUCCESS_ED: {
            const {data, error} = action;
            const {added} = state;
            return Object.assign({}, state, {
                added: true
            }, {error: error});
        }
        case types.UP_POST_SECTION_DELETE_ED: {
            const {data} = action;
            const {sections} = state;
            return Object.assign({}, state, {
                sections: [].concat(data)
            });
        }

        case types.UP_SELECT_USER_ED: {
            const {userId} = action;
            const {activeUser} = state;
            return Object.assign({}, state, {
                activeUser: userId
            });
        }

        case types.UP_SET_USER_START_DATE_ED: {
            const {date,userId} = action;
            const {activeUser,userStory,timeBegin,timeEnd} = state;
            console.log('userId ',userId);
            return Object.assign({}, state, {
                userStory: updateUserStory(userStory,userId,date,null,{timeBegin,timeEnd})
            });
        }

        case types.UP_SET_USER_END_DATE_ED: {
            const {date,userId} = action;
            const {activeUser,userStory,timeBegin,timeEnd} = state;
            return Object.assign({}, state, {
                userStory: updateUserStory(userStory,userId,null,date,{timeBegin,timeEnd})
            });
        }

        case types.UP_POST_PROJECT_ERROR_ED: {
            const error = action.error;
            const {added} = state;
            return Object.assign({}, state, {
                errors: error
            });
        }
        case types.UP_REMOVE_TECH_FROM_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: removeTechFromProject(predefinedTechnologies, _id)
            });
        }
        case 'INITIAL_STATE_FROM_DB': {
            const {project} = action;
            var data = [];
            var userStory = {};
            if(project.attachments.length != 0) {
                data = project.attachments.map(function (el) {
                    return fileThumbService.setThumb(Object.assign({}, el, {path: el.link}, {target: "file"}));
                });
            }
            if(project.screenShots.length != 0) {
                 project.screenShots.forEach(function (el) {
                     data.push(fileThumbService.setThumb(Object.assign({}, {path: el}, {target: "screenshot"})));
                });
            }
            if(project.users.length != 0) {
                project.users.forEach(function (el) {
                    el.userHistory.forEach(function(history) {
                        if (history.projectId == project._id) {
                                //userStory[el._id].dateFrom = history.dateFrom;
                                //userStory[el._id].dateTo = history.dateTo;
                                //userStory[el._id].projectId = history.projectId;
                            var b = {
                                dateFrom: history.dateFrom,
                                dateTo : history.dateTo,
                                projectId : history.projectId,
                            }
                            userStory[el._id] = Object.assign({}, b);
                        }

                    })
                });
            }

            if(project.owners.length != 0) {
                project.owners.forEach(function (el) {
                    el.userHistory.forEach(function(history) {
                        if (history.projectId == project._id) {
                            //userStory[el._id].dateFrom = history.dateFrom;
                            //userStory[el._id].dateTo = history.dateTo;
                            //userStory[el._id].projectId = history.projectId;
                            var b = {
                                dateFrom: history.dateFrom,
                                dateTo : history.dateTo,
                                projectId : history.projectId,
                            }
                            userStory[el._id] = Object.assign({}, b);
                        }

                    })
                });
            }
            return Object.assign({}, state, {
                projectId: project._id,
                location: project.location,
                projectName: project.projectName,
                projectLink: project.linkToProject,
                timeBegin: project.timeBegin,
                timeEnd: project.timeEnd,
                status: {name: project.status, value: project.status},
                users: project.users,
                owners: project.owners,
                tags: project.tags,
                technologies: project.technologies,
                conditions: project.conditions,
                contacts: project.contacts,
                userStory: userStory,
                features: project.features,
                files: data.map(function(el) {
                    return Object.assign({}, el, {ready: true}, {good: true}, {inBase: true})
                }),
                initialTags: false,
                initialTechnologies: false,
                initialUsers: false,
                initialSections: false,
                initialFiles: false,
                description:{
                    descrFullText: project.description.descrFullText
                }});
        }
        case 'CLEAN_STORE_ED': {
            return Object.assign({}, state, {
                projectId: null,
                projectName:'',
                projectLink:'',
                timeBegin:'',
                timeEnd:'',
                status:'',
                users: null,
                owners: null,
                tags: null,
                technologies: null,
                conditions: [],
                sections: [],
                features: [],
                files: [],
                activeSection: {},
                tagExists: false,
                added: false,
                initialTags: false,
                initialTechnologies: false,
                initialUsers: false,
                initialSections: false,
                iconLoaded: false,
                initialFiles: false,
                techIcon: {},
                techIconError: null,
                description:{
                    descrFullText: 'Description'
                },
                predefinedUsers: [],
                predefinedTags: [],
                predefinedTechnologies: [],
                predefinedConditions: []
            })
        }
        case 'INITIAL_STATE_TAGS': {
            const {predefinedTags} = action;
            return Object.assign({}, state, {predefinedTags: predefinedTags}, {initialTags: true})
        }
        case 'INITIAL_STATE_TECHNOLOGIES': {
            const {predefinedTechnologies} = action;
            return Object.assign({}, state, {predefinedTechnologies: predefinedTechnologies}, {initialTechnologies: true})
        }
        case 'INITIAL_STATE_USERS': {
            const {predefinedUsers} = action;
            return Object.assign({}, state, {predefinedUsers: predefinedUsers}, {initialUsers: true})
        }
        case 'INITIAL_STATE_SECTIONS': {
            const {sections} = action;
            return Object.assign({}, state, {sections: sections}, {initialSections: true})
        }
        case types.UP_UPLOAD_ICON_SUCCESS_ED: {
            const {data, iconLoaded, error} = action;
            const {techIcon} = state;
            return Object.assign({}, state, {
                techIcon: data,
                iconLoaded: iconLoaded,
                techIconError: error
            });
        }
        case "INITIAL_STATE_FI": {
            const {files} = action;
            return Object.assign({}, state, {files: files}, {initialFiles: true});
        }

        case types.SET_VISIBLE_FORM_BY_LINK_SCREENSHOOTS_ED: {
            const {hideFileScreenshoots,hideFormScreenshoots} = action;
            return Object.assign({}, state, {
                hideFileScreenshoots,
                hideFormScreenshoots
            })
        }

        case types.SET_VISIBLE_FORM_BY_LINK_ATTACHMENTS_ED: {
            const {hideFile,hideForm} = action;
            return Object.assign({}, state, {
                hideFile,
                hideForm
            })
        }

        case types.SET_VISIBLE_ADD_TECH_FORM_ED: {
            const {hideTechForm} = action;
            return Object.assign({}, state, {
                hideTechForm
            })
        }

        case types.UP_SET_LOCATION_ED: {
            const {position} = action;
            const {location} = state;
            return Object.assign({}, state, {
                location:position
            });
        }

        default: {
            return state;
        }
    }
};

const updateFileSuccess = (files, data, target) => {
    if (!data.hasOwnProperty('error')) {
        files.forEach( file => {
            const {name, path, thumb} = data;
            if (!file.ready && file.name === name && file.target === target) {
                file.path = path;
                file.thumb = thumb;
                file.ready = true;
            }
        });
    } else {
        files.forEach( file => {
            const {name, error} = data;
            console.log('updateFileFailure ');
            if (!file.ready && file.name === name) {
                file.ready = true;
                file.good = false;
                file.error = error;
            }
        });

    }
    return [].concat(files);
}

const updateFileFailure = (files, error) => {
    const {message, name} = error;
    files.forEach( file => {
        if (!file.ready && file.name === name) {

            file.ready = true;
            file.good = false;
        }
    });

    return [].concat(files);
}

const selectSection = (sections, _id) => {
    for(let i = 0; i < sections.length; i++) {
        if (sections[i]._id === _id) {
            return sections[i];
        }
    }
    return null;
};

const removeFile = (files, name) => {
    files.forEach( (file, index) => {
        if (file.name === name) {
            files.splice(index, 1);
        }
    });
    return [].concat(files);
}

const addNewTech  = (predefinedTechnologies, tech) => {
    tech.inProject = true;
    predefinedTechnologies.push(tech);
    return [].concat(predefinedTechnologies);
}

const addTechToProject = (techs, _id) => {
    techs.forEach( item => {
        if (item._id === _id) {
            item.inProject = true;
        }
    });
    return [].concat(techs);
}

const removeTechFromProject = (techs, _id) => {
    techs.forEach( item => {
        if (item._id === _id) {
            item.inProject = false;
        }
    });
    return [].concat(techs);
}


const addNewTag  = (predefinedTags, tag) => {
    tag.inProject = true;
    predefinedTags.push(tag);
    return [].concat(predefinedTags);
}

const addTagToProject = (predefinedTags, _id) => {
    predefinedTags.forEach( tag => {
        if (tag._id === _id) {
            tag.inProject = true;
        }
    });
    return [].concat(predefinedTags);
}

const removeTagFromProject = (predefinedTags, _id) => {
    predefinedTags.forEach( tag => {
        if (tag._id === _id) {
            tag.inProject = false;
        }
    });
    return [].concat(predefinedTags);
}

const addUserToProject = (predefinedUsers, _id) => {
    predefinedUsers.forEach( user => {
        if (user._id === _id) {
            user.inProject = true;
        }
    });
    return [].concat(predefinedUsers);
}

const removeUserFromProject = (predefinedUsers, _id) => {
    predefinedUsers.forEach( user => {
        if (user._id === _id) {
            user.inProject = false;
            user.owner = false;
        }
    });
    return [].concat(predefinedUsers);
}

const changeOwnership = (predefinedUsers, _id, value) => {
    predefinedUsers.forEach( user => {
        if (user._id === _id) {
            user.owner = value;
        }
    });
    return [].concat(predefinedUsers);
}

const updateProjectStartDate = (timeBegin, timeEnd, currDate) => {
    if (timeEnd) {
        const dateProjectStartSeconds = Date.parse(timeBegin);
        const dateProjectEndSeconds = Date.parse(timeEnd);
        if(dateProjectStartSeconds <= dateProjectEndSeconds) {
            return timeBegin;
        } else {
            return currDate;
        }
    } else {
        return timeBegin;
    }
}

const updateProjectEndDate = (timeBegin, timeEnd, currDate) => {
    if (timeBegin) {
        const dateProjectStartSeconds = Date.parse(timeBegin);
        const dateProjectEndSeconds = Date.parse(timeEnd);
        if(dateProjectEndSeconds >= dateProjectStartSeconds) {
            return timeEnd;
        } else {
            return currDate;
        }
    } else {
        return timeEnd;
    }
}

const updateUserStory = (story, userId, start, end, projectPeriod) => {
    if (userId) {
        if (story.hasOwnProperty(userId)) {
            if (projectPeriod) {
                const {timeBegin,timeEnd} = projectPeriod;
                const {dateFrom, dateTo} =  story[userId];
                const dateFromSeconds = Date.parse(dateFrom);
                const dateToSeconds = Date.parse(dateTo);
                const dateUserStartSeconds = Date.parse(start);
                const dateUserEndSeconds = Date.parse(end);

                if (timeBegin) {
                    const dateProjectStartSeconds = Date.parse(timeBegin);
                    if (dateUserStartSeconds >= dateProjectStartSeconds) {
                        if(story[userId].dateTo != null) {
                            if (dateUserStartSeconds <= dateToSeconds) {
                                story[userId].dateFrom = start;
                            }
                        } else {
                            story[userId].dateFrom = start;
                        }


                    }
                } else {
                    story[userId].dateFrom = start;
                }
                if (timeEnd) {
                    const dateProjectEndSeconds = Date.parse(timeEnd);
                    if (dateUserEndSeconds <= dateProjectEndSeconds) {
                        if (dateUserEndSeconds >= dateFromSeconds) {
                            story[userId].dateTo = end;
                        }

                    }
                } else {
                    if(story[userId].dateTo && end == null) {

                    }
                    else if(dateUserEndSeconds >= dateFrom){
                        story[userId].dateTo = end;
                    }
                }


                if(!timeBegin && !timeEnd) {
                    let newStartDate;
                    let newEndDate;
                    if (dateTo) {
                        if (dateToSeconds) {
                            if(dateUserStartSeconds < dateToSeconds) {
                                newStartDate = start;
                            }
                        }
                    } else {
                        newStartDate = start;
                    }



                    if (dateFrom) {
                        if (dateFromSeconds) {
                            if(dateUserEndSeconds > dateFromSeconds) {
                                newEndDate = end;
                            }
                        }
                    } else {
                        newEndDate = end;
                    }


                    story[userId] = {
                        dateFrom: newStartDate ? newStartDate : dateFrom,
                        dateTo: newEndDate ? newEndDate : dateTo
                    };
                }

            } else {
                story[userId] = {
                    dateFrom: start,
                    dateTo:end
                };
            }

        } else {

            story[userId] = {
                dateFrom: start,
                dateTo:end
            };
        }


    } else {
        for (let id in story) {
            const {dateFrom, dateTo} = story[id];
            if (start) {
                if (dateFrom) {
                    const dateFromSeconds = Date.parse(dateFrom);
                    const dateProjectStartSeconds = Date.parse(start);
                    if (dateProjectStartSeconds > dateFromSeconds) {
                        story[id].dateFrom = start;
                    }
                } else {
                    story[id].dateFrom = start;
                }

            }
            if(end) {
                if (dateTo) {
                    const dateToSeconds = Date.parse(dateTo);
                    const dateProjectEndSeconds = Date.parse(end);
                    if (dateProjectEndSeconds < dateToSeconds) {
                        story[id].dateTo = end;
                    }
                } else {
                    story[id].dateTo = end;
                }

            }
            if(story[id].dateTo < story[id].dateFrom) {
                story[id].dateTo = story[id].dateFrom;
            }
        }

    }
    return Object.assign({},story);
}





const feature = {
    _id : "57a2631ab42bbf5a2daa9997",
    featureName : "5184",
    section : "57b9c2e4acd14b1840a00c5c",
    featureOrder : "Necesary",
    isNecessary : false,
    created : "24/04/2015",
    isImplemented : false,
    childFeatures : "57a237d2fc13ae319e002654",
    isItSubFeature : false,
    descriptionText : "Description Sample Text",
    descriptionHTMLText : "Description HTML Sample Text"
}



const initialState = {
    projectId: null,
    projectName:'',
    projectLink:'',
    timeBegin:'',
    timeEnd:'',
    status:'',
    owners: null,
    tags: null,
    technologies: null,
    conditions: [],
    sections: [],
    features: [],
    files: [],
    filesS: [],
    activeSection: {},
    tagExists: false,
    activeUser: null,
    userStory: {},
    added: false,
    initialTags: false,
    initialTechnologies: false,
    initialUsers: false,
    initialSections: false,
    initialFiles: false,
    iconLoaded: false,
    location: null,
    errors: {nameError: false, technologiesError: false, timeBeginError: false, usersError: false, timeEndError: false,
        nameLengthError: false},
    techIcon: {},
    contacts: {
        countryCode: '',
        countryName: '',
        postalIndex: '',
        state_region: '',
        city: '',
        street: '',
        building: '',
        appartment: '',
        contactPerson: '',
        phone: '',
        email: '',
        skype: ''
    },
    techIconError: '',
    description:{
        descrFullText: 'Description'
    },
    predefinedUsers: [],
    predefinedTags: [],
    predefinedTechnologies: [],
    predefinedConditions: [],
    hideFile : 'visible',
    hideForm : 'hidden',
    hideFileScreenshoots : 'visible',
    hideFormScreenshoots : 'hidden',
    hideTechForm : 'hidden'

};
