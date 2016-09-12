import * as types from '../constants/ProjectViewActionTypes';
const initialState = {
    filters: {
        feature: null,
        user: {
            name: "",
            right: ""
        }
    }
}

export default function ProjectViewReducer(state = initialState, action) {
    switch (action.type) {
        case types.PROJECT_VIEW_START_LOADING : 
            return Object.assign({ isLoading: true },state);
        case types.PROJECT_VIEW_END_LOADING: 
        console.log(Object.assign({ 
                    isLoading: false,
                },state,action['project']
            ));
            return Object.assign({ 
                    isLoading: false,
                },state,action['project']
            );
        case types.PROJECT_VIEW_ERROR_LOADING: 
            return Object.assign({
                    isLoading: false
                },state,action.error
            );
        default: return state;        
    }
}