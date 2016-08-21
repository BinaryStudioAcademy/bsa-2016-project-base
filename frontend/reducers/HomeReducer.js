import * as types from '../constants/HomeActionTypes';

const initialState = {
    projects: [],
    pagination: {
        activePage: 0,
        perpage: 2,
        total:0
    }
};

export default function HomeReducer(state = initialState, action) {


    switch (action.type) {
        case "PROJECTS_PAGINATION_UPDATE":
            return Object.assign({}, state, {
                pagination:action.pagination
            });

        case types.PROJECTS_GET_ALL_START_LOADING: {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        case types.PROJECTS_GET_ALL_SUCCESS: {
            const { data } = action;

            return Object.assign({}, state, {
                isLoading: false,
                projects: data
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