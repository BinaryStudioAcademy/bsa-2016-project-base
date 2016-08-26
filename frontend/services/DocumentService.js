import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';

class DocumentService {
    constructor() {

    }
    getAuthLink(){
        return fetch(`${API}documents/authentication`)
            .then(res=>res.json())
    }
    getTestDocument(tokens){
        return fetch(`${API}documents/test/${tokens}`)
            .then(res=>res.json())
    }

    setDataToFile(featureObj, token) {
        return fetch(`${API}documents/estimation/${token}`, {
            method: 'POST',
            body: JSON.stringify({sections: featureObj}),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }
}
export default new DocumentService();