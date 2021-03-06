import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';
var url = constants.URL
class UploadService {

	constructor(){
		this.url = constants.URL + "upload/";
	}

    upload(file) {
        var formData = new FormData();
        formData.append(file.name, file);
        return fetch(this.url,
        	Object.assign({
                	method: "POST",
            		body:formData
            	}, constants.cookieMarker
            )
        );
    }

    uploadFileByLink(link){
        return fetch(`${url}/uploadByLink/`, Object.assign({
                method: 'POST',
                body: JSON.stringify({
                    link:link
                })
            }, constants.cookieMarker,
            constants.jsonHedeaders
        ));
    }

    uploadFileByLinkAttachments(link){
        return fetch(`${url}/uploadByLinkAttachments/`, Object.assign({
                method: 'POST',
                body: JSON.stringify({
                    link:link
                })
            }, constants.cookieMarker,
            constants.jsonHedeaders
        ));
    }

    uploadFileByFile(file){
        return fetch(`${url}/file/`, Object.assign({
                method: 'POST',
                body: file
            }, constants.cookieMarker
        ))
    }

    deleteFile(file){
        return fetch(`${url}/file/`, Object.assign({
                method: 'DELETE',
                body: JSON.stringify({file: file})
            }, constants.cookieMarker,
            constants.jsonHedeaders
        ))
    }
}

const uploadService = new UploadService();
export default uploadService;