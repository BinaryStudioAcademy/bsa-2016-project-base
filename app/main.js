import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import {AdminPage, RightsTab, FeaturesTab, TagsTab, TechTab, TechScopeTab} from '../components/admin/index';
import App from './App.js';
import adminReducer from '../components/admin/reducers/adminReducer';


const rootReducer = combineReducers({	//Add other reducers later
  adminReducer
});


const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension()
);

render(
    (<Provider store={store}>
        <Router history={browserHistory}>
           <Route path="/" component={App}/>
             <Route path="admin" component={AdminPage}>
             	<Route path="rights" component={RightsTab} />
                <Route path="features" component={FeaturesTab} />
                <Route path="tags" component={TagsTab} />
                <Route path="tech" component={TechTab} />
                <Route path="techscope" component={TechScopeTab} />
              </Route>
        </Router>
    </Provider>)
    , document.getElementById('root')
);