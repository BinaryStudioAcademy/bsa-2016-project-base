import { combineReducers } from 'redux';
import users from './users_reducer';
console.log(users);

export const rootReducer = combineReducers({
    users: users
});

export default rootReducer;