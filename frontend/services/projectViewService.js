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

	addingQ(projectId, newQuestion) {
		console.log(this.url + projectId + "/questions");
		return fetch(
			this.url + projectId + "/questions",
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
		console.log(this.url + projectId + "/questions/" + qId + "/answers");
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
		console.log(this.url + projectId + "/questions/" + questionId + "/answers/" + answerId);
		return fetch(
			this.url + projectId + "/questions/" + questionId + "/answers/" + answerId,
			Object.assign({
					method: 'DELETE'
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	sendingEditedQ(projectId, questionId, message, checked) {
		console.log(this.url + projectId + "/questions/" + questionId);
		var body = {
			message: message,
			isChecked: checked
		};
		return fetch(
			this.url + projectId + "/questions/" + questionId,
			Object.assign({
					method: 'PUT',
					body: JSON.stringify(body)
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

	sendingEditedA(projectId, questionId, numA, answerId, message) {
		console.log(this.url + projectId + "/questions/" + questionId + "/answers/" + answerId);
		var body = {
			numA: numA,
			message: message
		};
		return fetch(
			this.url + projectId + "/questions/" + questionId + "/answers/" + answerId,
			Object.assign({
					method: 'PUT',
					body: JSON.stringify(body)
				},
				constants.cookieMarker,
				constants.jsonHedeaders
			)
		);
	}

}

const projectViewService = new ProjectViewService();
export default projectViewService;