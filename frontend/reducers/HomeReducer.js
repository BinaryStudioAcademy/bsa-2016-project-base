import * as types from '../constants/HomeActionTypes';

const initialState = {
    projects: [],
    search: ''
};

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {

        case types.FILTER_FEATURES_DETAILS:
            const { search } = action;

            return Object.assign({}, state, {
                search: search
            });
        case types.PROJECTS_GET_ALL_START_LOADING: {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        case types.PROJECTS_GET_ALL_SUCCESS: {
            return Object.assign({}, state, {
                isLoading: false,
                projects: action.data
            });
        }
        case types.PROJECTS_GET_ALL_ERROR: {
            console.log(action.error);
            return Object.assign({}, state, {
                isLoading: false,
                error: action.error
            });
        }
        default:
            return state;
    }
};