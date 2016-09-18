/**
 * Created by razorka on 15.09.16.
 */
import * as types from './AdminProjectsDeleteActionsTypes';
import ProjectService  from '../../services/homeService';


export function getAllProjectsDelete() {
    return dispatch=> {
        return ProjectService.getAllProjects()
            .then(response => response.json())
            .then(json => dispatch(initProjects(json)))
            .catch(error => {
                dispatch(errorHandler('Bad Request'));
                dispatch(initProjects([]));
            })
    }
}
export function initProjects(projects) {
    return {
        type: types.INIT_PROJECTS_FOR_DELETE,
        listOfProjects: projects
    }
}
export function deleteProject(id) {
    return dispatch => {
        return ProjectService.deleteProjects(id)
            // .then(getAllProjectsDelete())
            // .catch(error => {
            //     dispatch(errorHandler('Bad Request'));
            //     dispatch(initProjects([]));
            // })
    }
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}

