import * as types from '../constants/ReviewActionTypes';

const initialState = {
    projects: [],
    selectedProject: null,
    isLoading: false,
    project: {}
};

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {

        case types.REVIEW_SET_SELECTED_PROJECT: {
            return {...state,...{
                selectedProject: action.selectedProject
            }};
        }
        case types.REVIEW_GET_PROJECT_LOADING: {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        case types.REVIEW_GET_PROJECT_SUCCESS: {
            const { data } = action;

            return {...state,...{
                isLoading: false,
                project: data
            }};
        }

        case types.REVIEW_GET_ALL_PROJECTS_LOADING: {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        case types.REVIEW_GET_ALL_PROJECTS_SUCCESS: {
            const { data } = action;

            return {...state,...{
                isLoading: false,
                projects: data
            }};
        }
        case types.REVIEW_GET_ALL_PROJECTS_ERROR: {
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