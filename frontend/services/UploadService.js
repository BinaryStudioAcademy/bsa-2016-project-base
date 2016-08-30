import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class UploadService {

	constructor(){
		this.url = constants.URL + "upload/";
	}

    upload(file) {
    	var formData = new FormData();
        formData.append("attachment", file);
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