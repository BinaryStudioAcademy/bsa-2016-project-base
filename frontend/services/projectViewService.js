import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class ProjectViewService {

	constructor(){
		this.url = constants.URL + "project-view/";
	}

	getProject(projectId) {
		console.log(this.url + projectId);
		return fetch(this.url + projectId,constants.cookieMarker);
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;