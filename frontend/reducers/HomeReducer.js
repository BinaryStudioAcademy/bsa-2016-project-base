import * as types from '../constants/HomeActionTypes';

const initialState = {
    projects: [],
    search: '',
    filterTech: [],
    pagination: {
        activePage: 1,
        perpage: 3
    }
};

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {

        case types.FILTER_PROJECTS_BY_TECH_DETAILS:
            const { filterTech, check } = action;
            let filter = [];

            if (check){
                filter = [...state.filterTech, filterTech];
            } else {
                filter = state.filterTech.filter(v => !~v.indexOf(filterTech));
            }

            return Object.assign({}, state, {
                filterTech: filter
            });
        case types.FILTER_PROJECTS_DETAILS:
            const { search } = action;

            return Object.assign({}, state, {
                search: search
            });
        case types.PAGINATION_ACTIVE_PAGE:
            return Object.assign({}, state, {
                pagination: { ...state.pagination, activePage: action.activePage}
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