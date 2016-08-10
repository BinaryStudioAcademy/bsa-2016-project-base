import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';

class FeatureService {

    getAllFeatures(projectId) {
        return fetch(`${API}projects/${projectId}/features`);
    }

    getAllProjects() {
        return fetch(`${API}mainpage`);
    }

}

const featureService = new FeatureService();
export default featureService;