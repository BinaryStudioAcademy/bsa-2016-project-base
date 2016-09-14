import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class ProjectViewService {

	constructor(){
		this.url = constants.URL + "project-view/";
	}

	getProject(projectId,filters) {
		let query = `${this.url}projectId=${projectId}`;
		if(filters['user'].right) query += `&userRight=${filters['user'].right}`;
		if(filters['user'].name) query += `&userName=${filters['user'].name}`;
		if(filters['features'].length) query += `&featureIds=${filters['features'].join(',')}`;
		return fetch(query,constants.cookieMarker);
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;