import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class UploadService {

	constructor(){
		this.url = constants.URL + "upload/";
	}

    upload(files) {
        var formData = new FormData();
    	for (let i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }
        return fetch(this.url,
        	Object.assign({
                	method: "POST",
            		body:formData
            	}, constants.cookieMarker
            )
        );    
    }
}

const uploadService = new UploadService();
export default uploadService;