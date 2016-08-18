import projectViewService from '../services/project-view-service';



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



export function getProject(projId) {
    return (dispatch, getState) => {
    	const state = getState().ProjectViewReducer;
		console.log('action "getProject" state: ', state);
		
		const aquireProject = {
		    type: 'PW_GET_PROJECT',
		    // selectedProjectId: state.selectedProjectId,
            selectedProjectId: projId,
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

    	console.log('getProjectStage() -> aquireProjectStages: ', aquireProjectStages);
    	projectViewService.getProjectStage(state.CONST_stagesRestPath, dispatch, aquireProjectStages);
    };
}

export function getProjectTags() {
    return (dispatch, getState) => {
        const state = getState().ProjectViewReducer;
        console.log('action "getProjectTags" state: ', state);
        const aquireProjectTags = {
                type: 'PW_GET_PROJECT_TAGS',
                projectId: state.selectedProjectId,
                projTags: undefined
        };

        console.log('getProjectTags() -> aquireProjectTags: ', aquireProjectTags);
        projectViewService.getProjectTags(state.CONST_projectsRestPath, dispatch, aquireProjectTags);
    };
}


export function getProjectTechnologies() {
    return (dispatch, getState) => {
        const state = getState().ProjectViewReducer;
        console.log('action "getProjectTehnologies" state: ', state);
        const aquireProjectTechnologies = {
                type: 'PW_GET_PROJECT_TECHNOLOGIES',
                projectId: state.selectedProjectId,
                projTechnologies: undefined
        };

        console.log('getProjectTechnologies() -> aquireProjectTechnologies: ', aquireProjectTechnologies);
        projectViewService.getProjectTechnologies(state.CONST_projectsRestPath, dispatch, aquireProjectTechnologies);
    };
}

export function getProjectFeatures() {
    return (dispatch, getState) => {
        const state = getState().ProjectViewReducer;
        console.log('action "getProjectFeatures" state: ', state);
        const aquireProjectFeatures = {
                type: 'PW_GET_PROJECT_FEATURES',
                projectId: state.selectedProjectId,
                projFeatures: undefined,
                sectionsPath: state.CONST_sectionsRestPath
        };

        console.log('getProjectFeatures() -> aquireProjectFeatures: ', aquireProjectFeatures);
        projectViewService.getProjectFeatures3(state.CONST_projectsRestPath, dispatch, aquireProjectFeatures);
    };
}