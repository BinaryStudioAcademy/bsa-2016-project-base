import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class ProjectViewService {

	checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) return response;
	  else {
	    const error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	}

	parseJSON(response) {
	 	return response.json();
	}

    getListProjects(path, dispatch, dispObj) {
    	let returnValue = fetch(path,constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.projList = data;
	      		dispatch(dispObj);
	    	});
		return dispObj;
	}


	getListUsers(path, dispatch, dispObj) {
		fetch(path,constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.usersList = data;
	      		dispatch(dispObj);
	    	});
	}

	getProject(state, dispatch, dispObj) {
		fetch(state.CONST_projectsRestPath + '/' + dispObj.selectedProjectId + '/users-owners/',constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.selectedProject = data;
	      		fetch(state.CONST_stagesRestPath + '/' + data.stage,constants.cookieMarker)
	      			.then(this.checkStatus)
	      			.then(this.parseJSON)
	    			.then(dataStage => {
	    				dispObj.selectedProject.stage = dataStage;
	    				fetch(state.CONST_conditionsRestPath + '/' + data.condition,constants.cookieMarker)
			      			.then(this.checkStatus)
			      			.then(this.parseJSON)
			    			.then(dataCondition => {
			    				dispObj.selectedProject.condition = dataCondition;
			    				dispatch(dispObj);
	    					});
	    			});
	    			dispatch(dispObj);
	    	});
	}


	getProjectStage(path, dispatch, dispObj) {
		fetch( path + '/' + dispObj.projStageId,constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.projStage = data;
	      		dispatch(dispObj);
	    	});
	}

	getProjectTags(path, dispatch, dispObj) {
		fetch( path + '/' + dispObj.projectId + '/tags',constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.projTags = data.tags;
	      		dispatch(dispObj);
	    	});
	}

	getProjectTechnologies(path, dispatch, dispObj) {
    	fetch(path + '/' + dispObj.projectId + '/technologies',constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.projTechnologies = data.technologies;
	      		dispatch(dispObj);
	    	});
	}

	getProjectFeatures(path, dispatch, dispObj) {
		fetch(path + '/' + dispObj.projectId + '/features',constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		dispObj.projFeatures = data.features;
	    		dispatch(dispObj);
			});
	}

	getProjectFeatures3(path, dispatch, dispObj) {
  		fetch(path + '/' + dispObj.projectId + '/features',constants.cookieMarker)
	    	.then(this.checkStatus)
	    	.then(this.parseJSON)
	    	.then(data => {
	      		if (data.features.length == 0) dispatch(dispObj);
				dispObj.projFeatures = data.features;
				return data;
	    	}).then(data => {
		      	let sectionsPromises = [];
		      	data.features.forEach(function(entry, i, arr) {	
					sectionsPromises.push(
						fetch(dispObj.sectionsPath + '/' + entry.section,constants.cookieMarker)
					);
		    	});
				Promise.all(sectionsPromises).then((sectArr)=>{
		      		sectArr.forEach((entry, i, arr)=>{
		      			Promise.resolve(entry)
  							.then(this.checkStatus)
							.then(this.parseJSON)
							.then(sectionData => {
								dispObj.projFeatures[i].section = sectionData;
								if (i == arr.length - 1) dispatch(dispObj);
							});
		      		});
		      		
		      	});
				
	    	});
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;