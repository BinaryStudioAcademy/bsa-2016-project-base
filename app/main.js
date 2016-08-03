import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.js';
import {AdminPage, RightsTab, FeaturesTab, TagsTab, TechTab, TechScopeTab} from '../components/admin/index';
import ProjectsPage from '../components/projects/ProjectsPage';
import ProjectPage from '../components/project/ProjectPage';
import UpsertProjectPage from '../components/project/UpsertProjectPage';
import StatsPage from '../components/stats/StatsPage';
import ReviewPage from '../components/review/ReviewPage';
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
            <Route path="projects" component={ProjectsPage}/> 
            <Route path="project" component={ProjectPage}/>
            <Route path="project/add" component={UpsertProjectPage}/>  
            <Route path="admin" component={AdminPage} > 
              <Route path="rights" component={RightsTab} />
              <Route path="features" component={FeaturesTab} />
              <Route path="tags" component={TagsTab} />
              <Route path="tech" component={TechTab} />
              <Route path="techscope" component={TechScopeTab} />
           </Route>
           <Route path="stats" component={StatsPage} /> 
           <Route path="review" component={ReviewPage} /> 
          </Route>
        </Router>
      </Provider>) 
, document.getElementById('root')
);
