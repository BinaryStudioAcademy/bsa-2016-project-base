import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class ReviewService {

	constructor(){
		this.url = constants.URL + "review/";
	}

    getAllProjects() {
        return fetch(this.url, constants.cookieMarker);
    }

    getProject(id) {
        return fetch(this.url + id, constants.cookieMarker);
    }

}

const reviewService = new ReviewService();
export default reviewService;