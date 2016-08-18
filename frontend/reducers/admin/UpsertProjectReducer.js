import * as types from '../../actions/admin/UpsertProjectActionTypes';

export default function UpsertProjectReducer(state=initialState, action) {
	switch (action.type) {
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
            	projectName: name
            });
        }
        case types.CHANGE_PROJECT_LINK: {
            const {link} = action;
            return Object.assign({}, state, {
            	projectLink: link
            });
        }
        case types.CHANGE_START_DATE: {
            const {date} = action;
            return Object.assign({}, state, {
            	startDate: date
            });
        }
        case types.CHANGE_FINISH_DATE: {
            const {date} = action;
            return Object.assign({}, state, {
            	finishDate: date
            });
        }
        case types.CHANGE_CONDITION: {
            const {option} = action;
            return Object.assign({}, state, {
            	condition: option
            });
        }
        case types.CHANGE_DESCRIPTION: {
            const {text} = action;
            return Object.assign({}, state, {
            	description: text
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
        case types.ADD_NEW_TAG_TO_PROJECT: {
            const {newTagName} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: addNewTagToProject(tags, newTagName)
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
            const {techs} = state;
            return Object.assign({}, state, {
                techs: addTechToProject(techs, _id)
            });
        }
        case types.REMOVE_TECH_FROM_PROJECT: {
            const {_id} = action;
            const {techs} = state;
            return Object.assign({}, state, {
                techs: removeTechFromProject(techs, _id)
            });
        }
        case types.ADD_NEW_TECH_TO_PROJECT: {
            const {tech} = action;
            const {techs} = state;
            return Object.assign({}, state, {
                techs: addNewTechToProject(techs, tech)
            });
        }
        case types.REMOVE_NEW_TECH_FROM_PROJECT: {
            const {tech} = action;
            const {techs} = state;
            return Object.assign({}, state, {
                techs: removeNewTechFromProject(techs, tech)
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
			return techs;
		}
	});
	return techs;
}

const addTechToProject = (techs, _id) => {
	techs.forEach( item => {
		if (item._id === _id) {
			item.inProject = true;
			return techs;
		}
	});
	return techs;
}

const removeTechFromProject = (techs, _id) => {
	techs.forEach( item => {
		if (item._id === _id) {
			item.inProject = false;
			return techs;
		}
	});
	return techs;
}



const addNewTagToProject = (tags, tagName) => {
	let exist = false;
	tags.forEach( (tag, index) => {
		if (tag.tagName === tagName) exist = true;
		
	});
	console.log('Tagssss!!!!!!',tagName);
	if (!exist) {
		tags.push({
			tagName: tagName,
			inProject: true
		});
	}
	
	return tags;
}

const removeNewTagFromProject = (tags, tagName) => {
	tags.forEach( (tag, index) => {
		if (tag.tagName === tagName) {
			tags.splice(index, 1)
			return tags;
		}
	});
	return tags;
}

const addTagToProject = (tags, _id) => {
	tags.forEach( tag => {
		if (tag._id === _id) {
			tag.inProject = true;
			return tags;
		}
	});
	return tags;
}

const removeTagFromProject = (tags, _id) => {
	tags.forEach( tag => {
		if (tag._id === _id) {
			tag.inProject = false;
			return tags;
		}
	});
	return tags;
}

const addUserToProject = (users, _id) => {
	console.log(users);
	users.forEach( user => {
		if (user._id === _id) {
			user.inProject = true;
			return users;
		}
	});
	return users;
}

const removeUserFromProject = (users, _id) => {
	console.log(users);
	users.forEach( user => {
		if (user._id === _id) {
			user.inProject = false;
			user.owner = false;
			return users;
		}
	});
	return users;
}

const changeOwnership = (users, _id, value) => {
	console.log(users);
	users.forEach( user => {
		if (user._id === _id) {
			user.owner = value;
			return users;
		}
	});
	return users;
}

const users = [
		{
 			_id: '57a26314b42bbf5y67daa9965',
 			avatar: 'https://maxcdn.icons8.com/office/PNG/40/User_Interface/login_as_user-40.png', 
 			name: 'Vasya', 
 			position: 'IOS Developer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42bbf5y67eaa9965',
 			avatar: 'https://maxcdn.icons8.com/office/PNG/40/User_Interface/login_as_user-40.png', 
 			name: 'Sasha', 
 			position: 'Android Developer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42sbf5y67daa9965',
 			avatar: 'https://maxcdn.icons8.com/office/PNG/40/User_Interface/login_as_user-40.png', 
 			name: 'Katya', 
 			position: 'Beckend Developer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42sbi5y67daa9965',
 			avatar: 'https://maxcdn.icons8.com/office/PNG/40/User_Interface/login_as_user-40.png', 
 			name: 'Max', 
 			position: 'Fontend Developer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42sbi5y67iaa9965',
 			avatar: 'https://maxcdn.icons8.com/office/PNG/40/User_Interface/login_as_user-40.png', 
 			name: 'Martin', 
 			position: 'UX Designer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42sbi5y07daa9965',
 			avatar: 'https://maxcdn.icons8.com/office/PNG/40/User_Interface/login_as_user-40.png', 
 			name: 'Tod', 
 			position: 'Ruby Developer',
 			owner: false,
 			inProject: false
 		}];


const tags = [
	{
		_id:"57a26314b42bbf5a2daa9965",
		tagName:"Nepali",
		inProject: false
	},
	{
		_id:"57a26384b42bbf5a2daa9965",
		tagName:"French",
		inProject: false
	},
	{
		_id:"57a26314b42bbt5a2daa9965",
		tagName:"English",
		inProject: false
	},
	{
		_id:"57a26314b42bbs5a2daa9965",
		tagName:"Romanian",
		inProject: false
	},
	{
		_id:"57a26314b42bbk5a2daa9965",
		tagName:"Spanish",
		inProject: false
	},
	{
		_id:"57a26314b42bbu5a2daa9965",
		tagName:"Portuguese",
		inProject: false
	}
];



const techs = [
	{                                                              
        "_id" : "57a2f5f3d50c16908d4e0c2f",          
        "techName" : "ReactJS",                                
        "techAvatar" : "http://www.ryannitz.org/tech-notes/wp-content/uploads/2009/07/icon.png",      
        "techDescription" : "React JS",                        
        "__v" : 0,                                             
        "techVersion" : "1.0.3"                                
},                                                             
{                                                              
        "_id" : "57a2f5f3d50c16908d4e0c30",          
        "techName" : "NodeJS",                                 
        "techAvatar" : "http://www.ryannitz.org/tech-notes/wp-content/uploads/2009/07/icon.png",      
        "techDescription" : "NodeJS",                          
        "__v" : 0,                                             
        "techVersion" : "2.7.5"                                
},                                                              
{                                                              
        "_id" : "57a2f5f3d50c16908d4e0c31",          
        "techName" : "MongoDb",                                
        "techAvatar" : "http://www.ryannitz.org/tech-notes/wp-content/uploads/2009/07/icon.png",      
        "techDescription" : "MongoDb",                         
        "__v" : 0,                                             
        "techVersion" : "3.2"                                  
},                                                             
{                                                              
        "_id" : "57a2f5f3d50c16908d4e0c32",          
        "techName" : "Angular",                                
        "techAvatar" : "http://www.ryannitz.org/tech-notes/wp-content/uploads/2009/07/icon.png",      
        "techDescription" : "Angular",                         
        "__v" : 0,                                             
        "techVersion" : "5.1"                                  
}                                                              
];



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
	users: users,
	tags: tags,
	techs: techs,
	files: files
};





/*const initialState = {
	update: false,
	project: {
		_id:"57acc61ab781f506fe6ca72a",
		projectName:"First Web-project",
		timeBegin:"2013-06-09",
		timeEnd:"2014-06-09",
		isCompleted:true,
	}
};*/

/*
{
	_id:"57acc61ab781f506fe6ca72a",
	projectName:"First Web-project",
	isCompleted:true,
	timeBegin:"2016-08-11T18:38:18.890Z"
	timeEnd:"2016-08-11T18:38:18.890Z",
	stage: {
		_id:"57a2fac7d50c16908d4e0c33"
		stageName:"Completed"
		commissioned:"18/03/2014"
		decommissioned:"13/03/2015"
	},
	condition: {
		_id:"57ac5379204135dfe49f780b"
		conditionName:"In use"
		commisioned:"12/12/12"
		decomissioned:"13/13/13"
	},

}*/