const initialState = {
    serverUID: null,
    userRole: null
};
export default function UserAuthReducer(state = initialState, action) {
    switch(action.type){
        case 'SET_AUTH_USER': {
        	console.log('qwerty',action['user'],Object.assign({},action['user']));
            return Object.assign({},state,action['user']);
        }
        default: return state;
    }
}
