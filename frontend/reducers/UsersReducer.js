import * as types from '../constants/UsersActionTypes';

const INITIAL_STATE = {
    users: []
};

export default function UsersReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case types.USERS_GET_ALL_START_LOADING: {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        case types.USERS_GET_ALL_LOADED: {
            return Object.assign({}, state, {
                isLoading: false,
                users: action.payload
            });
        }    
        case types.USERS_GET_ALL_ERROR: {
            console.log(action.error);
            return Object.assign({}, state, {
                isLoading: false,
                error: action.error
            });
        }    
        default: {
            return state;
        }
    }
};