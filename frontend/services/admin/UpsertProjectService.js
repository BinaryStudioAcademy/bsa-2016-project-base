import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();


class UpsertProjectService {
    getPredefinedData() {
        return fetch('/api/predefined/');
    }

}
const upsertProjectService = new UpsertProjectService();
export default upsertProjectService;



