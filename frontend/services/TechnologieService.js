import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';


class TechnologieService {
    getAllTechnologies() {
        return fetch('http://localhost:3000/api/technologie/')
    }

    addTechnologie(tech) {
        return fetch("http://localhost:3000/api/technologie/", {
            method: 'POST',
            body: JSON.stringify(tech),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }

    deleteTechnologie(tech) {
        return fetch(`http://localhost:3000/api/technologie/${tech._id}`, {
            method: 'DELETE'
        })
    }
}

const techService = new TechnologieService();

export default techService;