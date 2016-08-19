import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

class TechnologieService {

    getAllTechnologies() {
        return fetch("http://localhost:3000/api/technology/");
    }
    addTechology(tech) {
    	return fetch("/api/technologies/", {
            headers: ({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify(tech)
        });
    }

}



const techService = new TechnologieService();
export default techService;

