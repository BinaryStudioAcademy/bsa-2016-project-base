import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';


class ProjectViewService {


	checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	  	// console.log(response.status);
	  	// console.log('checkStatus: ', response);
	    return response;
	  } else {
	    const error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	}

	parseJSON(response) {
	  	console.log('JSON Parse: ', response);
	 	return response.json();
	}


    getListProjects(path, dispatch, dispObj) {

    	console.log('project-view-service -> getListProjects() parameters: ', path, dispatch, dispObj);

    	let returnValue = fetch(path, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getListProjects() -> then.getListProjects():', data);
	      		//return data;
	      		dispObj.projList = data;
	      		console.log('getListProjects(...) -> Object to dispatch: ', dispObj);
	      		dispatch(dispObj);
	    	});
		console.log('ProjectViewService.getListProjects(): ', returnValue);
		return dispObj;
	}


	getListUsers(path, dispatch, dispObj) {

    	console.log('project-view-service -> getListUsers() parameters: ', path, dispatch, dispObj);
    	let returnValue = fetch(path, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getListUsers() -> then:', data);
	      		//return data;
	      		dispObj.usersList = data;
	      		console.log('getListUsers(...) -> Object to dispatch: ', dispObj);
	      		dispatch(dispObj);
	    	});
		console.log('ProjectViewService.getListUsers(): ', returnValue);
		//return dispObj;
	}

	getProject(state, dispatch, dispObj) {
		console.log('project-view-service -> getProject() parameters: ', state, dispatch, dispObj);
		const reqPath = state.CONST_projectsRestPath + '/' + dispObj.selectedProjectId + '/users-owners/';
		console.log('project-view-service -> getProject() requested "project" path: ', reqPath);

    	let returnValue = fetch(reqPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getProject() -> "projects" then:', data);
	      		//return data;
	      		dispObj.selectedProject = data;

	      		/*const reqStagePath = state.CONST_stagesRestPath + '/' + data.stage;
	      		console.log('project-view-service -> getProject() requested "projects stage" path: ', reqStagePath);
	      		fetch(reqStagePath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	      			.then(this.checkStatus)
	      			.then(this.parseJSON)
	    			.then(dataStage => {
	    				console.log('project-view-service -> getProject() -> "projects stage" then:', dataStage);
	    				dispObj.selectedProject.stage = dataStage;
	    				//console.log('getProject(...) -> Object to dispatch: ', dispObj);
	      				//dispatch(dispObj);

	      				const reqConditionPath = state.CONST_conditionsRestPath + '/' + data.condition;
	      				console.log('project-view-service -> getProject() requested "projects condition" path: ', reqConditionPath);
	      				fetch(reqConditionPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
			      			.then(this.checkStatus)
			      			.then(this.parseJSON)
			    			.then(dataCondition => {
			    				console.log('project-view-service -> getProject() -> "projects condition" then:', dataCondition);
			    				dispObj.selectedProject.condition = dataCondition;
			    				console.log('getProject(...) -> Object to dispatch: ', dispObj);
			      				dispatch(dispObj);
	    					});
	    			});*/
	      		console.log('getProject(...) -> Object to dispatch: ', dispObj);
	      		dispatch(dispObj);
	    	});
		console.log('ProjectViewService.getProject(): ', returnValue);
		//return dispObj;
	}

	//there is no stage more
	/*getProjectStage(path, dispatch, dispObj) {
		console.log('project-view-service -> getProjectsStage() parameters: ', path, dispatch, dispObj);

		const reqPath = path + '/' + dispObj.projStageId;
		console.log('project-view-service -> getProjectsStage() requested path: ', reqPath);

    	let returnValue = fetch(reqPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getProjectsStage() -> then:', data);
	      		//return data;
	      		dispObj.projStage = data;
	      		console.log('getProjectsStages(...) -> Object to dispatch: ', dispObj);
	      		dispatch(dispObj);
	    	});
		//console.log('ProjectViewService.getProjectsStage(): ', returnValue);
		//return dispObj;
	}*/

	getProjectTags(path, dispatch, dispObj) {
		console.log('project-view-service -> getProjectTags() parameters: ', path, dispatch, dispObj);

		const reqPath = path + '/' + dispObj.projectId + '/tags';
		console.log('project-view-service -> getProjectTags() requested path: ', reqPath);

    	let returnValue = fetch(reqPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getProjectTags() -> then:', data);
	      		//return data;
	      		dispObj.projTags = data.tags;
	      		console.log('getProjectTags(...) -> Object to dispatch: ', dispObj);
	      		dispatch(dispObj);
	    	});
		//console.log('ProjectViewService.getProjectTags(): ', returnValue);
		//return dispObj;
	}

	getProjectTechnologies(path, dispatch, dispObj) {
		console.log('project-view-service -> getProjectTechnologies() parameters: ', path, dispatch, dispObj);

		const reqPath = path + '/' + dispObj.projectId + '/technologies';
		console.log('project-view-service -> getProjectTechnologies() requested path: ', reqPath);

    	let returnValue = fetch(reqPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getProjectTechnologies() -> then:', data);
	      		//return data;
	      		dispObj.projTechnologies = data.technologies;
	      		console.log('getProjectTechnologies(...) -> Object to dispatch: ', dispObj);
	      		dispatch(dispObj);
	    	});
		//console.log('ProjectViewService.getProjectTags(): ', returnValue);
		//return dispObj;
	}

	getProjectFeatures(path, dispatch, dispObj) {
		console.log('project-view-service -> getProjectFeatures() parameters: ', path, dispatch, dispObj);

		const reqPath = path + '/' + dispObj.projectId + '/features';
		console.log('project-view-service -> getProjectFeatures() requested path: ', reqPath);

		let returnValue = fetch(reqPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getProjectFeatures() -> then:', data);
	      		//return data;
	      		dispObj.projFeatures = data.features;
	      		
	      		console.log('data.features length is: ', data.features.length);
	      		console.log('data.features : ', data.features);
				console.log('getProjectFeatures(...) -> Object to dispatch: ', dispObj);
	    		dispatch(dispObj);
			});
	}

	getProjectFeatures3(path, dispatch, dispObj) {
		console.log('project-view-service -> getProjectFeatures() parameters: ', path, dispatch, dispObj);

		const reqPath = path + '/' + dispObj.projectId + '/features';
		console.log('project-view-service -> getProjectFeatures() requested path: ', reqPath);

  		let returnValue = fetch(reqPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		console.log('project-view-service -> getProjectFeatures() -> then:', data);
	      		if (data.features.length == 0) {
	      			dispatch(dispObj);
	      		}
				dispObj.projFeatures = data.features;
				return data;
	    	})
		    .then(data => {
		    	console.log('data.features length is: ', data.features.length);
		      	console.log('data.features : ', data.features);
		      	let sectionsPromises = [];

		      	data.features.forEach(function(entry, i, arr) {	
					let reqSectionPath = dispObj.sectionsPath + '/' + entry.section;
					//let reqSectionPath = dispObj.featuresPath + '/' + data.features[i]._id + '/sections';
					sectionsPromises.push(
						fetch(reqSectionPath, { method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
					);
		    	});
				console.log('project-view-service -> getProjectFeatures() -> sections promises:', sectionsPromises);

		      	Promise.all(sectionsPromises).then((sectArr)=>{
		      		console.log('Feature sections array: ', sectArr);

		      		sectArr.forEach((entry, i, arr)=>{
		      			Promise.resolve(entry)
      							.then(this.checkStatus)
								.then(this.parseJSON)
								.then(sectionData => {
									console.log('sectionData: ', sectionData);
									dispObj.projFeatures[i].section = sectionData;
									if (i == arr.length-1) {
										console.log('getProjectFeatures3(...) -> Object to dispatch: ', dispObj);
		      							dispatch(dispObj);
									}
								});
		      		});
		      		
		      	});
				
	    	});
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;