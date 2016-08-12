const initialState = {
    serverUID: null,
    userRole: null
};
export default function UserAuthReducer(state = initialState, action) {
    switch(action.type){
        case 'SET_AUTH_USER': {
            return Object.assign({},action['user']);
        }
        default: return state;
    }
}
