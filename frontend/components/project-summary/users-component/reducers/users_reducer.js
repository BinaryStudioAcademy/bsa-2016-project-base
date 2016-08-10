
import { FETCH_USERS } from '../actions/index';
console.log(FETCH_USERS);
const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_USERS:
            return action.payload;
        default:
        return state;
    }
};


   