import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class DocumentService {

    constructor() {
        this.url = constants + "documents/";
    }

    getAuthLink(){
        return fetch(`${this.url}authentication`,
            constants.cookieMarker)
            .then(res=>res.json())
    }

    getTestDocument(tokens){
        return fetch(`${this.url}test/${tokens}`,
            constants.cookieMarker)
            .then(res=>res.json())
    }

    setDataToFile(featureObj, token) {
        return fetch(`${this.url}documents/estimation/${token}`, 
            Object.assign({
                method: 'POST',
                body: JSON.stringify({sections: featureObj})
            },  constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

}

const documentService  = new DocumentService();
export default documentService;