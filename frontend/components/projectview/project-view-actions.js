import projectViewService from '../../services/project-view-service';



export function getListProjects() {
    
    return (dispatch, getState) => {
    	const state = getState().ProjectViewReducer;
		/*const askProjects = {
		   	type: 'PW_ASK_LIST_PROJECTS'
		};*/
		console.log('action "getListProjects" state: ', state);
		const aquireProjects = {
		    type: 'PW_GET_LIST_PROJECTS',
		    projList: undefined
		};

    	projectViewService.getListProjects(state.CONST_projectsRestPath, dispatch, aquireProjects);
    	
    	// dispatch(askProjects);
    	// dispatch(aquireProjects);
    };
}

export function getListUsers() {
    
    return (dispatch, getState) => {
    	const state = getState().ProjectViewReducer;
		console.log('action "getListUsers" state: ', state);
		
		const aquireUsers = {
		    type: 'PW_GET_LIST_USERS',
		    usersList: undefined
		};

    	projectViewService.getListUsers(state.usersRestPath, dispatch, aquireUsers);
    };
}



export function getProject() {
    return (dispatch, getState) => {
    	const state = getState().ProjectViewReducer;
		console.log('action "getProject" state: ', state);
		
		const aquireProject = {
		    type: 'PW_GET_PROJECT',
		    selectedProjectId: state.selectedProjectId,
		    selectedProject: undefined
		};

    	projectViewService.getProject(state, dispatch, aquireProject);
    };
}

export function getProjectStage(projectStageId) {
    return (dispatch, getState) => {
    	const state = getState().ProjectViewReducer;
		console.log('action "getProjectsStage" state: ', state);

    	const aquireProjectStages = {
    		type: 'PW_GET_PROJECTS_STAGE',
    		projStageId: projectStageId,
		    projStage: undefined
    	};

    	console.log('getProject() -> aquireProjectStages: ', aquireProjectStages);
    	projectViewService.getProjectStage(state.CONST_stagesRestPath, dispatch, aquireProjectStages);
    };

}