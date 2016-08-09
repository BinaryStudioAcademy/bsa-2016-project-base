import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

class FeatureService {

    addNewFeature(featureObj) {
        return fetch("http://localhost:3000/api/features/", {
            method: 'POST',
            body: JSON.stringify(featureObj),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }

    getAllFeatures() {
        return fetch('http://localhost:3000/api/features/')
    }

    removeFeature(idFeature) {
        return fetch("http://localhost:3000/api/features/" + idFeature, {
            method: 'DELETE',
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }
}

const featureService = new FeatureService();
export default featureService;
