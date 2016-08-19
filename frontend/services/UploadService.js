import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();

class UploadService {
    upload(file) {
    	var formData = new FormData();
        formData.append("attachment", file);
        return fetch('/api/upload/', {
            method: "POST",
            body:formData
        });
    }
}
const uploadService = new UploadService();
export default uploadService;