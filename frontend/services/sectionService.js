import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class SectionService {

    constructor(){
        this.url = constants.URL + "sections/";
    }

    addNewSection(sectionObj) {
        return fetch(this.url, Object.assign({
                method: 'POST',
                body: JSON.stringify(sectionObj)
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

    getAllSections() {
        return fetch(this.url,constants.cookieMarker);
    }

    removeSection(sectionId) {
        return fetch(this.url + sectionId,
                Object.assign({
                    method: 'DELETE'
                }, constants.cookieMarker,
                constants.jsonHedeaders 
            ) 
        );
    }

    editSection(sectionObj) {
        return fetch(this.url + sectionObj._id,
            Object.assign({
                method: 'PUT',
                body: JSON.stringify(sectionObj)
            }, constants.cookieMarker,
               constants.jsonHedeaders 
            )
        );
    }

}

const sectionService = new SectionService();
export default sectionService;
