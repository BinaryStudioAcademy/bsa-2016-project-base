import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

class FeatureService {

    getAllFeatures() {
        return fetch('http://localhost:3000/api/features/')
    }
}

const featureService = new FeatureService();
export default featureService;