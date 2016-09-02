import projectViewService from '../services/projectViewService';
import * as types from '../constants/ProjectViewActionTypes';

export function getProject(projectId) {
    return (dispatch) => {
        dispatch({ type: types.PROJECT_VIEW_START_LOADING });
        return projectViewService.getProject(projectId)
            .then(response => response.json())
            .then(project => {
                dispatch({
                    type: types.PROJECT_VIEW_END_LOADING,
                    projectData: project
                });
            }).catch(error => {
                dispatch({
                    type: types.PROJECT_VIEW_ERROR_LOADING,
                    error
                });
            });    
    };
}
