import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../../constants/Api';

class EditProjectService {
    getByAllData(projectId) {
        return fetch(`${constants.URL}projects/${projectId}/allData`,
            constants.cookieMarker);
    }
}

const editProjectService = new EditProjectService();
export default editProjectService;