import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';


class ReviewService {

    getAllProjects() {
        return fetch(`${API}review`);
    }

    getProject(id) {
        return fetch(`${API}review/${id}`);
    }
}

const reviewService = new ReviewService();
export default reviewService;