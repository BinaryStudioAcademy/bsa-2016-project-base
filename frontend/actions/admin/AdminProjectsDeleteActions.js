/**
 * Created by razorka on 15.09.16.
 */
import async from 'async';
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
export function deleteProject(id,projects) {
    return dispatch => {
        async.waterfall([
            function (callback) {
                let result =  ProjectService.deleteProjects(id)
                    .catch(error => {
                        dispatch(errorHandler('Bad Request'));
                        dispatch(initProjects([]));
                    });
                if(result){
                    callback(null);
                }
            }
        ],function (err,result) {
            dispatch(initProjects(projects));
        });
    }
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}

