import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class FeatureService {

    constructor(){
        this.url = constants.URL + "features/";
    }

    getAllFeatures(projectId) {
        return fetch(`${constants.URL}project/${projectId}/features`,
         constants.cookieMarker);
    }

    getAllFeaturesOfAllProjects() {
        return fetch(`${constants.URL}featureswithsections/`, 
            constants.cookieMarker);
    }

    addNewFeature(featureObj) {
        return fetch(this.url, Object.assign({
                method: 'POST',
                body: JSON.stringify(featureObj)
            },  constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

    removeFeature(idFeature) {
        return fetch(this.url + idFeature, 
            Object.assign({
                 method: 'DELETE'
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

    editFeature(featureObj) {
        return fetch(this.url + featureObj._id, 
            Object.assign({
                method: 'PUT',
                body: JSON.stringify(featureObj)
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

    removeFeatures(features){
        return fetch(this.url,
            Object.assign({
                    method: 'DELETE',
                    body: JSON.stringify(features)
                }, constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

}

const featureService = new FeatureService();
export default featureService;
