import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.js';
import {AdminPage, RightsTab, FeaturesTab, TagsTab, TechTab, TechScopeTab} from '../components/admin/index';
import Completed from '../components/completed.js'
import Single from '../components/single.js'
import Update from '../components/update.js'
import Chart from '../components/chart.js'
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
         <Route path="/" component={App}>
           <Route path="completed" component={Completed} /> /* List of completed projects */
           <Route path="single" component={Single} /> /* Single opened project  */
           <Route path="update" component={Update} /> /* Create (update project) */
           <Route path="admin" component={AdminPage} > /* Administration */
             <Route path="rights" component={RightsTab} />
             <Route path="features" component={FeaturesTab} />
             <Route path="tags" component={TagsTab} />
             <Route path="tech" component={TechTab} />
             <Route path="techscope" component={TechScopeTab} />
           </Route>
           <Route path="chart" component={Chart} /> /*	Charts view */
         </Route>
       </Router>
    </Provider>)
    , document.getElementById('root')
);
