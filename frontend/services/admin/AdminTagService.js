import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();

class AdminTagService {

    getAllTags() {
        return fetch('/api/tags');
    }

    deleteTags(tags) {
        return fetch('/api/tags', {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(tags)
        });
    }

    addTag(tag) {
        return fetch('/api/tags', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(tag)
        });
    }
}
const adminTagService = new AdminTagService();
export default adminTagService;