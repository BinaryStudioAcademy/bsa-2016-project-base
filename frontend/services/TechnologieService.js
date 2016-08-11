import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

class TechnologieService {

    getAllTechnologies() {
        return fetch("http://localhost:3000/api/technology/")
    }
}



const techService = new TechnologieService();
export default techService;
