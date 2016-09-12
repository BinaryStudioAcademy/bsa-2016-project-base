import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class ProjectViewService {

	constructor(){
		this.url = constants.URL + "project-view/";
	}

	getProject(projectId,filters) {
		console.log("11");
		return fetch(this.url + projectId,
			Object.assign({ body: filters},
				constants.cookieMarker,
	         	constants.jsonHedeaders
	        )
	    );
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;