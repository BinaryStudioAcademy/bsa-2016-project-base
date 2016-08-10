import React, { Component } from 'react';
import UserList from './users_list';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root_reducer';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
// console.log(rootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);
// const store = createStoreWithMiddleware(rootReducer);
export default class User extends Component {
    render() {
        return (
            <Provider store={ store }>
                <UserList />
            </Provider>
        );
    }
}