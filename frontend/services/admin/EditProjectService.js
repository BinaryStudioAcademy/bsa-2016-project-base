import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../../constants/Api';

class EditProjectService {
    getByAllData(projectId) {
        return fetch(`${constants.URL}projects/${projectId}/allData`,
            constants.cookieMarker);
    }

    updateProjectService(project) {
        //alert("AGA!!!");
        return fetch(`${constants.URL}projects/${project.project._id}/`,
            Object.assign({
                    method: 'PUT',
                    body: JSON.stringify(project)
                }, constants.cookieMarker,
                constants.jsonHedeaders
            )
        );

    }

    updateUsersProjectService(id, userHistory) {
        //alert("AGA!!!");
        return fetch(`${constants.URL}users/${id}/changeproject`,
            Object.assign({
                    method: 'PUT',
                    body: JSON.stringify(userHistory)
                }, constants.cookieMarker,
                constants.jsonHedeaders
            )
        );

    }

}
const editProjectService = new EditProjectService();
export default editProjectService;