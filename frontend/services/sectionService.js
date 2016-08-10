import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

class SectionService {
    addNewSection(sectionObj) {
        return fetch("http://localhost:3000/api/sections/", {
            method: 'POST',
            body: JSON.stringify(sectionObj),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }

    getAllSections() {
        return fetch("http://localhost:3000/api/sections/")
    }

}


const sectionService = new SectionService();
export default sectionService;
