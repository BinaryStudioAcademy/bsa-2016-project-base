import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';


class DocumentService {
    constructor() {

    }
    getAuthLink(){
        return fetch("/api/documents/authentication")
            .then(res=>res.json())
    }
    getTestDocument(tokens){
        return fetch("/api/documents/test/"+tokens)
            .then(res=>res.json())
    }
}
export default new DocumentService();