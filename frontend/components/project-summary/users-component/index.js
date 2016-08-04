import React, { Component } from 'react';
import UserList from './users_list';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers/root_reducer';
console.log(rootReducer);
const store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());
export default class User extends Component {
    render() {
        return (
            <Provider store={ store }>
                <UserList />
            </Provider>
        );
    }
}