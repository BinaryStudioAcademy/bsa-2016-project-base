import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
promise.polyfill();


class UpsertProjectService {

    getPredefinedData() {
        return fetch('/api/predefined/');
    }

    addProject(project) {
        return fetch('/api/projects', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(project)
        });
    }

}
const upsertProjectService = new UpsertProjectService();
export default upsertProjectService;



