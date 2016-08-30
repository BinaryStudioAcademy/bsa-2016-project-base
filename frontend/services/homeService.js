import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class HomeService {

	constructor(){
		this.url = constants.URL + "mainpage/";
	}

    getAllProjects() {
        return fetch(this.url, constants.cookieMarker);
    }

    getAllFeaturesSorted(orderBy) {
        return fetch(this.url + orderBy, constants.cookieMarker);
    }

    getProjects(query) {
        return this.getAllProjects();
    }

}

const homeService = new HomeService();
export default homeService;