import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class TechnologieService {

    constructor() {
        this.url = constants.URL + "technologies/";
    }

    getAllTechnologies() {
        return fetch(this.url, constants.cookieMarker);
    }

    addTechology(tech) {
        return fetch(this.url, Object.assign({
                method: 'POST',
                body: JSON.stringify(tech)
            }, constants.cookieMarker,
            constants.jsonHedeaders
            )
        );
    }

    getTech(id) {
        return fetch(`/api/technologies/` + id, constants.cookieMarker)
    }

    updateData(id, data) {
        return fetch(`/api/technologies/${id}`,
            Object.assign({
                    method: 'PUT',
                    body: JSON.stringify(data)
                }, constants.cookieMarker,
                constants.jsonHedeaders
            ))
    }
    saveTechnology(technology) {
        return fetch(this.url, Object.assign({
                method: 'POST',
                body: JSON.stringify(technology)
            }, constants.cookieMarker,
            constants.jsonHedeaders
        ))
    }

    deleteTechnology(id) {
        return fetch(`/api/technologies/${id}`, Object.assign({
                method: 'DELETE',
            }, constants.cookieMarker
        ))
    }

}

const techService = new TechnologieService();
export default techService;

