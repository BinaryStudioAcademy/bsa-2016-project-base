import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../../constants/Api';

class EditProjectService {
    getByAllData(projectId) {
        return fetch(`${constants.URL}project/${projectId}/allData`,
            constants.cookieMarker);
    }

    updateProjectService(project) {
        return fetch(`${constants.URL}project/${project._id}/`,
            Object.assign({
                    method: 'PUT',
                    body: JSON.stringify(project)
                }, constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }
}
const editProjectService = new EditProjectService();
export default editProjectService;