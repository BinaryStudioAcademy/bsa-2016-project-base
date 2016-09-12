import projectViewService from '../services/projectViewService';
import * as types from '../constants/ProjectViewActionTypes';

export function getProject(projectId,filters) {
    return (dispatch) => {
        dispatch({ type: types.PROJECT_VIEW_START_LOADING });
        return projectViewService.getProject(projectId,filters)
            .then(response => response.json())
            .then(project => {
                project['filters'] = filters;
                dispatch({
                    type: types.PROJECT_VIEW_END_LOADING,
                    project: project
                });
            }).catch(error => {
                dispatch({
                    type: types.PROJECT_VIEW_ERROR_LOADING,
                    error
                });
            });    
    };
}
