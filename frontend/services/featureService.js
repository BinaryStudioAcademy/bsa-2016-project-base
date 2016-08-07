import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';

const apiHost = 'http://localhost:3000/';

class FeatureService {

    getAllFeatures(projectId) {
        return fetch(`${API}projects/${projectId}/features`);
    }

}

const featureService = new FeatureService();
export default featureService;