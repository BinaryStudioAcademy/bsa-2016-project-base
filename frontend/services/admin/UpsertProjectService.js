import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../../constants/Api';

class UpsertProjectService {

    getPredefinedData() {
        return fetch(constants.URL + "predefined/",constants.cookieMarker);
    }

    addProject(project) {
        return fetch(constants.URL + "project/", 
            Object.assign({
                method: "POST",
                body: JSON.stringify(project)
            },  constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

}

const upsertProjectService = new UpsertProjectService();
export default upsertProjectService;



