import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

class SectionService {
    addNewSection(sectionObj) {
        return fetch("http://localhost:6500/api/sections/", {
            method: 'POST',
            body: JSON.stringify(sectionObj),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }

    getAllSections() {
        return fetch("http://localhost:6500/api/sections/")
    }



    removeSection(sectionId) {
    return fetch("http://localhost:6500/api/sections/" + sectionId, {
        method: 'DELETE',
        headers: ({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    })
    }

    editSection(sectionObj) {
        return fetch("http://localhost:6500/api/sections/" + sectionObj._id, {
            method: 'PUT',
            body: JSON.stringify(sectionObj),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }

}


const sectionService = new SectionService();
export default sectionService;
