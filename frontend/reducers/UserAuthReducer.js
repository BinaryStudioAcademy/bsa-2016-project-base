const initialState = {
    userEmail: null,
    userRole: null
};
export default function UserAuthReducer(state = initialState, action) {
    switch(action.type){
        case 'SET_AUTH_USER': {
            var newState = Object.assign({},state,action['user']);
            return newState;
        }
        default: return state;
    }
}
