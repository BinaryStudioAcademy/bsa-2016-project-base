import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import {API} from '../constants/Api';

class FileService {
    save(file) {
        debugger
        return fetch("http://localhost:3000/_image_upload_", {
            method: 'POST',
            body: JSON.stringify({filename:file.filename, data:file.data}),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
    }
}
export default new FileService();