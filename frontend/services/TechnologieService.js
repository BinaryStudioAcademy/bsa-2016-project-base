import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class TechnologieService {

    constructor(){
        this.url = constants.URL + "technologies/";
    }

    getAllTechnologies() {
        return fetch(this.url,constants.cookieMarker);
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

}

const techService = new TechnologieService();
export default techService;

