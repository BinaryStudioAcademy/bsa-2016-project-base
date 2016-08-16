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
        
        default: {
            return state;        
        }
    }
};





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

const users = [{
 			_id: '57a26314b42bbf5y67daa9965',
 			avatar: 'http://digitalizacia.weblab.sk/wp-content/uploads/2015/03/female-ico-60x60.png', 
 			name: 'Vasya', 
 			position: 'IOS Developer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42bbf5y67eaa9965',
 			avatar: 'http://digitalizacia.weblab.sk/wp-content/uploads/2015/03/female-ico-60x60.png', 
 			name: 'Sasha', 
 			position: 'Android Developer',
 			owner: true,
 			inProject: false
 		},{
 			_id: '57a26314b42sbf5y67daa9965',
 			avatar: 'http://digitalizacia.weblab.sk/wp-content/uploads/2015/03/female-ico-60x60.png', 
 			name: 'Katya', 
 			position: 'Beckend Developer',
 			owner: false,
 			inProject: false
 		},{
 			_id: '57a26314b42sbi5y67daa9965',
 			avatar: 'http://digitalizacia.weblab.sk/wp-content/uploads/2015/03/female-ico-60x60.png', 
 			name: 'Max', 
 			position: 'Fontend Developer',
 			owner: true,
 			inProject: false
 		}];

const initialState = {
	users: users,
	project: {
		
	}
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
		_id(pin):"57ac5379204135dfe49f780b"
		conditionName(pin):"In use"
		commisioned(pin):"12/12/12"
		decomissioned(pin):"13/13/13"
	},

}*/