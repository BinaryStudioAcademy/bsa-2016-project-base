
const initialState = {

	CONST_projectsRestPath: '/api/projects',
	CONST_usersRestPath: '/api/users',
	CONST_stagesRestPath: '/api/stages',
	CONST_conditionsRestPath: '/api/conditions',
	selectedProjectId: '57a315af0b7a3bc58341d3bd'

}

function checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  } else {
	    const error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	}


function parseJSON(response) {
	return response.json();
}


export default function ProjectViewReducer(state = initialState, action) {
    switch (action.type) {
        case 'PW_GET_LIST_PROJECTS': {
        	//let projList = projectViewService.getListProjects(state.CONST_projectsRestPath);
        	//console.log('ProjectViewReducer(): ', projList);
        	const {projList} = action;
	    	const newState = Object.assign({}, state, {
            		projectList: projList
	    	});
	    	console.log('ProjectViewReducer ->  "PW_GET_LIST_PROJECTS" -> newState', newState);
            return newState;
        }

        case 'PW_GET_LIST_USERS': {
        	const {usersList} = action;
	    	const newState = Object.assign({}, state, {
            		usersList: usersList
	    	});
	    	console.log('ProjectViewReducer ->  "PW_GET_LIST_USERS" -> newState', newState);
            return newState;
        }

        case 'PW_GET_PROJECT': {
        	const {selectedProject} = action;
	    	const newState = Object.assign({}, state, {
            		currentProject: selectedProject
	    	});
	    	console.log('ProjectViewReducer ->  "PW_GET_PROJECT" -> newState', newState);
            return newState;
        }

        case 'PW_GET_PROJECTS_STAGE': {
        	const {projStage} = action;
	    	const newState = Object.assign({}, state, {
            		relatedStage: projStage
	    	});
	    	console.log('ProjectViewReducer ->  "PW_GET_PROJECTS_STAGE" -> newState', newState);
            return newState;
        }


        default: {
            return state;        
        }
    }
}