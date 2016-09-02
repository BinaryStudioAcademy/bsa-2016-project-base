import * as types from '../constants/ProjectViewActionTypes';

export default function ProjectViewReducer(state = {}, action) {
    switch (action.type) {
        case types.PROJECT_VIEW_START_LOADING : 
            return { isLoading: true };
        case types.PROJECT_VIEW_END_LOADING: 
            return Object.assign({ 
                    isLoading: false
                },action.projectData
            );
        case types.PROJECT_VIEW_ERROR_LOADING: 
            return Object.assign({
                    isLoading: false
                },action.error
            );
        default: return state;        
    }
}