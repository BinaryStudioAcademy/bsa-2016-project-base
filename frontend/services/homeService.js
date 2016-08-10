import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';

class HomeService {

    getAllProjects() {
        return fetch(`${API}mainpage`);
    }

    getAllFeaturesSorted(orderBy) {
        return fetch(`${API}mainpage/${orderBy}`);
    }

}

const homeService = new HomeService();
export default homeService;