import * as types from '../../actions/admin/UpsertProjectActionTypes';


/*features
sections
tags
technologies
users*/

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
        case types.POST_TAG_SUCCESS: {
            const {data} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: addNewTag(tags, data)
            });
        }
        /*case types.ADD_NEW_TAG_TO_PROJECT: {
            const {newTagName} = action;
            const {tags} = state;
            const result = addNewTagToProject(tags, newTagName);

            return Object.assign({}, state, {
                tags: result[0],
                tagExists: result[1]
            });
        }*/
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
        case types.ADD_NEW_TECH_TO_PROJECT: {
            const {tech} = action;
            const {technologies} = state;
            return Object.assign({}, state, {
                technologies: addNewTechToProject(technologies, tech)
            });
        }
        case types.REMOVE_NEW_TECH_FROM_PROJECT: {
            const {tech} = action;
            const {technologies} = state;
            return Object.assign({}, state, {
                technologies: removeNewTechFromProject(technologies, tech)
            });
        }
        default: {
            return state;        
        }
    }
};


const addNewTechToProject = (techs, tech) => {
	let exist = false;
	techs.forEach( (item, index) => {
		if (item.techName === tech.techName) exist = true;
		
	});
	if (!exist) {
		tech.inProject = true;
		techs.push(tech);
	}
	
	return techs;
}

const removeNewTechFromProject = (techs, tech) => {
	techs.forEach( (item, index) => {
		if (item.techName === tech.techName) {
			techs.splice(index, 1)
		}
	});
	return [].concat(techs);
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



/*const addNewTagToProject = (tags,tagName) => {
	let exist = false;
	tags.forEach( (tag, index) => {
		if (tag.tagName === tagName) {
			exist = true;
			tag.inProject = true;
		}
		
	});
	console.log('exist ',tagName,' ', exist);
	return [[].concat(tags), exist];
}*/

const addNewTag  = (tags, tag) => {
	/*let exist = false;
	tags.forEach( (tag, index) => {
		if (tag.tagName === tagName) {
			exist = true;
			tag.inProject = true;
		}
		
	});
	if (!exist) {
		tags.push({
			tagName: tagName,
			inProject: true
		});
	}*/
	
	tag.inProject = true;
	console.log('addNewTagToProject ',tag);
	tags.push(tag)
	
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



const files = [
	{
		name: 'Country_Code_List.pdf',
		thumb: 'http://www.san-kommunalnik.ru/upload/medialibrary/e5b/e5b8f89ab48e10b1881bd83abea242d6.png',
		url: 'http://www.att.com/support_media/images/pdf/Country_Code_List.pdf'
	},
	{
		name: 'photo-thumb-179787.png',
		thumb: 'http://www.iphones.ru/forum/uploads/profile/photo-thumb-179787.png?_r=1355065431',
		url: 'http://www.iphones.ru/forum/uploads/profile/photo-thumb-179787.png?_r=1355065431'
	},
	{
		name: 'alph_names.pdf',
		thumb: 'http://www.san-kommunalnik.ru/upload/medialibrary/e5b/e5b8f89ab48e10b1881bd83abea242d6.png',
		url: 'http://www.ismn-international.org/basics/pdf/alph_names.pdf'
	},
	{
		name: '1421695500_iPhone-6-Mockup-gt.jpg',
		thumb: 'http://www.advancedphotoshop.co.uk/users/88672/thm100/1421695500_iPhone-6-Mockup-gt.jpg',
		url: 'http://www.advancedphotoshop.co.uk/users/88672/thm100/1421695500_iPhone-6-Mockup-gt.jpg'
	},{
		name: 'Country_Code_List.pdf',
		thumb: 'http://www.san-kommunalnik.ru/upload/medialibrary/e5b/e5b8f89ab48e10b1881bd83abea242d6.png',
		url: 'http://www.att.com/support_media/images/pdf/Country_Code_List.pdf'
	},
	{
		name: 'photo-thumb-179787.png',
		thumb: 'http://www.iphones.ru/forum/uploads/profile/photo-thumb-179787.png?_r=1355065431',
		url: 'http://www.iphones.ru/forum/uploads/profile/photo-thumb-179787.png?_r=1355065431'
	},
	{
		name: 'alph_names.pdf',
		thumb: 'http://www.san-kommunalnik.ru/upload/medialibrary/e5b/e5b8f89ab48e10b1881bd83abea242d6.png',
		url: 'http://www.ismn-international.org/basics/pdf/alph_names.pdf'
	},
	{
		name: '1421695500_iPhone-6-Mockup-gt.jpg',
		thumb: 'http://www.advancedphotoshop.co.uk/users/88672/thm100/1421695500_iPhone-6-Mockup-gt.jpg',
		url: 'http://www.advancedphotoshop.co.uk/users/88672/thm100/1421695500_iPhone-6-Mockup-gt.jpg'
	}
];


const initialState = {
	users: [],
	tags: [],
	technologies: [],
	conditions: [],
	files: [],
	tagExists: false

};


/*users,
	tags,
	technologies,
	files: files
		projectName: '',
	projectLink: '',
	timeBegin: '',
	timeEnd: '',*/
