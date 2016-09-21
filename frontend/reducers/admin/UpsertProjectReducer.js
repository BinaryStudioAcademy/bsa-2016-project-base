import * as types from '../../actions/admin/UpsertProjectActionTypes';

export default function UpsertProjectReducer(state = initialState, action) {
	switch (action.type) {
		 case types.UP_GET_DATA_SUCCESS: {
            const {users, tags, technologies, conditions } = action.data;
            return Object.assign({}, state, {
            	users,
				tags,
				technologies,
				conditions
            });
        }
        case types.UP_CLEAR_DATA: {
            const {users,tags,technologies} = state;
            return Object.assign({}, state, {
                added: false,
                tagExists: false,
                iconLoaded: false,
                sections: [],
                features: [],
                files: [],
                errors: null,
                activeSection: {},
                activeUser: null,
                userStory: {},
                projectName:'',
                projectLink:'',
                timeBegin:null,
                timeEnd:null,
                status:{value:'Estimation', name:'Estimation'},
                techIcon:{},
                techIconError: '',
                location: null,
                description:{
                    descrFullText: ''
                },
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
                users: setDefaults(users,{inProject: false,owner:false}),
                tags: setDefaults(tags,{inProject: false}),
                technologies: setDefaults(technologies,{inProject: false})
            });
        }
        
        case types.UP_SET_LOCATION: {
            const {position} = action;
            const {location} = state;
            return Object.assign({}, state, {
                location:position
            });
        }
         case types.UP_SET_CONTACT_FIELD: {
            const {field, data} = action;
            const {contacts} = state;
            return Object.assign({}, state, {
                contacts: {
                    ...contacts,
                    [field]: data
                }
            });
        }
        case types.UP_SELECT_USER: {
            const {userId} = action;
            const {activeUser} = state;
            return Object.assign({}, state, {
                activeUser: userId
            });
        }
        case types.UP_SET_USER_START_DATE: {
            const {date,userId} = action;
            const {activeUser,userStory,timeBegin,timeEnd} = state;
            console.log('userId ',userId);
            return Object.assign({}, state, {
                userStory: updateUserStory(userStory,userId,date,null,{timeBegin,timeEnd})
            });
        }
        case types.UP_SET_USER_END_DATE: {
            const {date,userId} = action;
            const {activeUser,userStory,timeBegin,timeEnd} = state;
            return Object.assign({}, state, {
                userStory: updateUserStory(userStory,userId,null,date,{timeBegin,timeEnd})
            });
        }
        case types.UP_ADD_USER_TO_PROJECT: {
            const {_id} = action;
            const {users,userStory,timeBegin,timeEnd} = state;
            return Object.assign({}, state, {
                users: addUserToProject(users, _id),
                userStory: updateUserStory(userStory,_id,timeBegin,timeEnd,null)
            });
        }
        case types.UP_REMOVE_USER_FROM_PROJECT: {
            const {_id} = action;
            const {users,userStory} = state;
            return Object.assign({}, state, {
                users: removeUserFromProject(users, _id),
                userStory: (() => {
                    delete userStory[_id];
                    return userStory;
                })()
                
            });
        }
        case types.UP_CHANGE_OWNERSHIP: {
            const {_id, checked} = action;
            const {users} = state;
            return Object.assign({}, state, {
                users: changeOwnership(users, _id, checked)
            });
        }
        case types.UP_CHANGE_PROJECT_NAME: {
            const {name} = action;
            return Object.assign({}, state, {
            		projectName: name
            });
        }
        case types.UP_CHANGE_PROJECT_LINK: {
            const {link} = action;
            return Object.assign({}, state, {
            		projectLink: link
            });
        }
        case types.UP_CHANGE_START_DATE: {
            const {date} = action;
            const {userStory,timeEnd,timeBegin} = state;
            return Object.assign({}, state, {
            	timeBegin: updateProjectStartDate(date, timeEnd, timeBegin),
                userStory: updateUserStory(userStory,null,date,null,null)
            });
        }
        case types.UP_CHANGE_FINISH_DATE: {
            const {date} = action;
            const {userStory,timeBegin,timeEnd} = state;
            return Object.assign({}, state, {
            	timeEnd: updateProjectEndDate(timeBegin, date,timeEnd),
                userStory: updateUserStory(userStory,null,null,date,null)
            });
        }
        case types.UP_CHANGE_STATUS: {
            const {option} = action;
            return Object.assign({}, state, {
            	status: option
            });
        }
        case types.UP_CHANGE_DESCRIPTION: {
            const {text} = action;
            return Object.assign({}, state, {
            	description:{
            			descrFullText:text
            	}
            });
        }
        case types.UP_ADD_TAG_TO_PROJECT: {
            const {_id} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: addTagToProject(tags, _id)
            });
        }
        case types.UP_REMOVE_TAG_FROM_PROJECT: {
            const {_id} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeTagFromProject(tags, _id)
            });
        }
        case types.UP_POST_PROJECT_SUCCESS: {
            const {data} = action;
            const {added} = state;
            return Object.assign({}, state, {
                added: true
            });
        }
        case types.UP_POST_PROJECT_ERROR: {
            const error = action.error;
            const {added} = state;
            return Object.assign({}, state, {
                errors: error
            });
        }
        case types.UP_POST_TAG_SUCCESS: {
            const {data} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: addNewTag(tags, data)
            });
        }
        case types.UP_POST_TECH_SUCCESS: {
            const {data, iconLoaded} = action;
            const {technologies} = state;
            console.log('POST_TECH',data);
            return Object.assign({}, state, {
                technologies: addNewTech(technologies, data),
                iconLoaded
            });
        }
        case types.UP_POST_SECTION_SUCCESS: {
            const {data} = action;
            const {sections} = state;
            console.log('POST_SECTION_SUCCESS',data);
            return Object.assign({}, state, {
                sections: sections.concat(data)
            });
        }
        case types.UP_POST_SECTION_DELETE: {
            const {data} = action;
            const {sections} = state;
            console.log('DELETE_SECTION_SUCCESS',sections);
            return Object.assign({}, state, {
                sections: [].concat(data)
            });
        }
        case types.UP_POST_FEATURE_SUCCESS: {
            const {data} = action;
            const {features} = state;
            console.log('POST_FEATURE_SUCCESS',data);
            return Object.assign({}, state, {
                features: features.concat(data)
            });
        }
        case types.UP_POST_FEATURE_DELETE: {
            const {data} = action;
            const {features} = state;
            console.log('DELETE_FEATURES_SUCCESS',data);
            return Object.assign({}, state, {
                features: [].concat(data)
            });
        }
        case types.UP_SELECT_SECTION: {
            const {_id} = action;
            const {sections, activeSection} = state;
            return Object.assign({}, state, {
                activeSection: selectSection(sections, _id)
            });
        }
        case types.UP_UPLOAD_FILE: {
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
        case types.UP_UPLOAD_FILE_SUCCESS: {
            const {data,target} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: updateFileSuccess(files, data, target)
            });
        }
        case types.UP_UPLOAD_ICON_SUCCESS: {
            const {data, iconLoaded, error} = action;
            const {techIcon} = state;
            return Object.assign({}, state, {
                techIcon: data,
                iconLoaded: iconLoaded,
                techIconError: error
            });
        }
        case types.UP_REMOVE_FILE: {
            const {file, index} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: removeFile(files, file, index)
            });
        }
        case types.UP_REMOVE_NEW_TAG_FROM_PROJECT: {
            const {tagName} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeNewTagFromProject(tags, tagName)
            });
        }
        case types.UP_ADD_TECH_TO_PROJECT: {
            const {_id} = action;
            const {technologies} = state;
            return Object.assign({}, state, {
                technologies: addTechToProject(technologies, _id)
            });
        }
        case types.UP_REMOVE_TECH_FROM_PROJECT: {
            const {_id} = action;
            const {technologies} = state;
            return Object.assign({}, state, {
                technologies: removeTechFromProject(technologies, _id)
            });
        }
        case types.SET_VISIBLE_ADD_TECH_FORM: {
            const {hideTechForm} = action;
            return Object.assign({}, state, {
                hideTechForm
            })
        }
        case types.SET_VISIBLE_FORM_BY_LINK_ATTACHMENTS: {
            const {hideFile,hideForm} = action;
            return Object.assign({}, state, {
                hideFile,
                hideForm
            })
        }
        case types.SET_VISIBLE_FORM_BY_LINK_SCREENSHOOTS: {
            const {hideFileScreenshoots,hideFormScreenshoots} = action;
            return Object.assign({}, state, {
                hideFileScreenshoots,
                hideFormScreenshoots
            })
        }
        default: {
            return state;        
        }
    }
};


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


const setDefaults = (source, props) => {
    source.forEach( (item, index) => {
            for(var key in props){
                const value = props[key];
                item[key] = value;
            }
    });
    return [].concat(source);
}

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
    console.log('updateFileFailure ',error.name);
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
    console.log('selectSection');
    return null;
}

const removeFile = (files, fileToRemove, fileIndex) => {
	files.forEach( (file, index) => {
		if (file.name === fileToRemove.name && 
            file.target === fileToRemove.target && index === fileIndex ) {
			files.splice(index, 1);
		}
	});
	return [].concat(files);
}

const addNewTech  = (technologies, tech) => {
	tech.inProject = true;
	technologies.push(tech);
	return [].concat(technologies);
}

const addTechToProject = (techs, _id) => {
	techs.forEach( item => {
		if (item._id === _id) {
			item.inProject = true;
		}
	});
	console.log('addTechToProject 22');
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


const addNewTag  = (tags, tag) => {
	tag.inProject = true;
	tags.push(tag);
	return [].concat(tags);
}

const addTagToProject = (tags, _id) => {
	tags.forEach( tag => {
		if (tag._id === _id) {
			tag.inProject = true;
		}
	});
	return [].concat(tags);
}

const removeTagFromProject = (tags, _id) => {
	tags.forEach( tag => {
		if (tag._id === _id) {
			tag.inProject = false;
		}
	});
	return [].concat(tags);
}

const addUserToProject = (users, _id) => {
	users.forEach( user => {
		if (user._id === _id) {
			user.inProject = true;
		}
	});
	return [].concat(users);
}

const removeUserFromProject = (users, _id) => {
	users.forEach( user => {
		if (user._id === _id) {
			user.inProject = false;
			user.owner = false;
		}
	});
	return [].concat(users);
}

const changeOwnership = (users, _id, value) => {
	users.forEach( user => {
		if (user._id === _id) {
			user.owner = value;
		}
	});
	return [].concat(users);
}

const initialState = {
    projectName:'',
    projectLink:'',
    timeBegin:null,
    timeEnd:null,
    status: {value:'Estimation', name:'Estimation'},
	users: [],
	tags: [],
	technologies: [],
	conditions: [],
    sections: [],
    features: [],
	files: [],
    activeSection: {},
    activeUser: null,
    userStory: {},
	tagExists: false,
    added: false,
    iconLoaded: false,
    techIcon: {},
    techIconError: '',
    location: null,
    description:{
        descrFullText: ''
    },
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
    hideFile : 'visible',
    hideForm : 'hidden',
    hideFileScreenshoots : 'visible',
    hideFormScreenshoots : 'hidden',
    hideTechForm : 'hidden'
	
};


