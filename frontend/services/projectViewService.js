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

	addingQ(projectId, newQuestion) {
		return fetch(this.url + projectId + "/questions",
			Object.assign({
					method: 'POST',
					body: JSON.stringify(newQuestion)
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	addingA(projectId, newAnswer, qId) {
		return fetch(
			this.url + projectId + "/questions/" + qId + "/answers",
			Object.assign({
					method: 'POST',
					body: JSON.stringify(newAnswer)
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	removingQ(projectId, questionId) {
		console.log(this.url + projectId + "/questions/" + questionId);
		return fetch(
			this.url + projectId + "/questions/" + questionId,
			Object.assign({
					method: 'DELETE'
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	removingA(projectId, questionId, answerId) {
		return fetch(
			this.url + projectId + "/questions/" + questionId + "/answers/" + answerId,
			Object.assign({ method: 'DELETE' },
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	sendingEditedQ(projectId, questionId, message, checked) {
		return fetch(
			this.url + projectId + "/questions/" + questionId,
			Object.assign({
					method: 'PUT',
					body: JSON.stringify({
						message: message,
						isChecked: checked
					})
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	sendingEditedA(projectId, questionId, numA, answerId, message) {
		return fetch(
			this.url + projectId + "/questions/" + questionId + "/answers/" + answerId,
			Object.assign({
					method: 'PUT',
					body: JSON.stringify({
						numA: numA,
						message: message
					})
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;