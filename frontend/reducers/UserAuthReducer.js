const initialState = {
    userEmail: "",
    userRole: ""
};
export default function UserAuthReducer(state = initialState, action) {
    if(action['type'] == "SET_AUTH_USER")
        return Object.assign({},state,action['user']);
    return state;
}
