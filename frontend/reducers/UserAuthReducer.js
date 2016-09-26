import * as types from '../constants/UserAuthActionTypes';

const initialState = {
    userEmail: "",
    userRole: ""
}

export default function UserAuthReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_AUTH_USER_START_LOADING:

            var newState = Object.assign({},
                state,
                action.user,
                {isLoading: true}
            );

            return newState;

        case types.SET_AUTH_USER_END_LOADING:

            var newState = Object.assign({},
                state,
                {userInfo: action.user[0]},
                {isLoading: false}
            );

            return newState;

        case types.SET_AUTH_USER_ERROR_LOADING:

            var newState = Object.assign({},
                state,
                action.error
            );

            return newState;

        default: return state;
    }
    /*if(action['type'] == "SET_AUTH_USER")
        return Object.assign({},state,action['user']);
    return state;*/
}
