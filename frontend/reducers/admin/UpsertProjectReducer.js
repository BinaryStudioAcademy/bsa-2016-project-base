import * as types from '../../actions/admin/UpsertProjectActionTypes';


export default function UpsertProjectReducer(state=initialState, action) {
	switch (action.type) {
		 case types.GET_DATA_SUCCESS: {
            const {users, tags, technologies, conditions } = action.data;
            return Object.assign({}, state, {
            	users,
				tags,
				technologies,
				conditions
            });
        }
        case types.ADD_USER_TO_PROJECT: {
            const {_id} = action;
            const {users} = state;
            return Object.assign({}, state, {
                users: addUserToProject(users, _id)
            });
        }
        case types.REMOVE_USER_FROM_PROJECT: {
            const {_id} = action;
            const {users} = state;
            return Object.assign({}, state, {
                users: removeUserFromProject(users, _id)
            });
        }
        case types.CHANGE_OWNERSHIP: {
            const {_id, checked} = action;
            const {users} = state;
            return Object.assign({}, state, {
                users: changeOwnership(users, _id, checked)
            });
        }
        case types.CHANGE_PROJECT_NAME: {
            const {name} = action;
            return Object.assign({}, state, {
            	info: {
            		...state.info,
            		projectName: name
            	}
            });
        }
        case types.CHANGE_PROJECT_LINK: {
            const {link} = action;
            return Object.assign({}, state, {
            	info: {
            		...state.info,
            		projectLink: link
            	}
            });
        }
        case types.CHANGE_START_DATE: {
            const {date} = action;
            return Object.assign({}, state, {
            	info: {
            		...state.info,
            		timeBegin: date
            	}
            });
        }
        case types.CHANGE_FINISH_DATE: {
            const {date} = action;
            return Object.assign({}, state, {
            	info: {
            		...state.info,
            		timeEnd: date
            		
            	}
            });
        }
        case types.CHANGE_CONDITION: {
            const {option} = action;
            return Object.assign({}, state, {
            	info: {
            		...state.info,
            		condition: option
            	}
            });
        }
        case types.CHANGE_DESCRIPTION: {
            const {text} = action;
            return Object.assign({}, state, {
            	info: {
            		...state.info,
            		description:{
            			descrText:text
            		} 
            	}
            });
        }
        case types.ADD_TAG_TO_PROJECT: {
            const {_id} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: addTagToProject(tags, _id)
            });
        }
        case types.REMOVE_TAG_FROM_PROJECT: {
            const {_id} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeTagFromProject(tags, _id)
            });
        }
        case types.ADD_TAG_SUCCESS: {
            const {data} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: addNewTag(tags, data)
            });
        }
        case types.ADD_TECH_SUCCESS: {
            const {data} = action;
            const {technologies} = state;
            console.log('POST_TECH',data);
            return Object.assign({}, state, {
                technologies: addNewTech(technologies, data)
            });
        }
        case types.ADD_SECTION_SUCCESS: {
            const {data} = action;
            const {sections} = state;
            console.log('POST_SECTION_SUCCESS',data);
            return Object.assign({}, state, {
                sections: sections.concat(data)
            });
        }
        case types.ADD_FEATURE_SUCCESS: {
            const {data} = action;
            const {features} = state;
            console.log('POST_FEATURE_SUCCESS',data);
            return Object.assign({}, state, {
                features: features.concat(data)
            });
        }
        
        case types.SELECT_SECTION: {
            const {_id} = action;
            const {sections, activeSection} = state;
            return Object.assign({}, state, {
                activeSection: selectSection(sections, _id)
            });
        }
        
        case types.UPLOAD_FILE_SUCCESS: {
            const {path} = action.data;
            const {files} = state;
            return Object.assign({}, state, {
                files: files.concat({
                	url: path,
                	thumb: path,
                	name: path.slice(path.lastIndexOf('/')+1,path.length)
                })
            });
        }
        case types.REMOVE_FILE: {
            const {name} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: removeFile(files, name)
            });
        }
        case types.REMOVE_NEW_TAG_FROM_PROJECT: {
            const {tagName} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeNewTagFromProject(tags, tagName)
            });
        }
        case types.ADD_TECH_TO_PROJECT: {
            const {_id} = action;
            const {technologies} = state;
            return Object.assign({}, state, {
                technologies: addTechToProject(technologies, _id)
            });
        }
        case types.REMOVE_TECH_FROM_PROJECT: {
            const {_id} = action;
            const {technologies} = state;
            return Object.assign({}, state, {
                technologies: removeTechFromProject(technologies, _id)
            });
        }
        default: {
            return state;        
        }
    }
};


const selectSection = (sections, _id) => {
    for(let i = 0; i < sections.length; i++) {
         if (sections[i]._id === _id) {
            return sections[i];
        }
    }
    console.log('selectSection');
    return null;
}

const removeFile = (files, name) => {
	files.forEach( (file, index) => {
		if (file.name === name) {
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
	users: [],
	tags: [],
	technologies: [],
	conditions: [],
    sections: [],
    features: [],
	files: [],
    activeSection: {},
	tagExists: false

};



