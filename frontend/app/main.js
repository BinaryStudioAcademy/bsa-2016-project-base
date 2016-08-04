import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.js';
import {Admin, Rights, Features, Tags, Tech, TechScope} from '../components/admin/index';
import ProjectsList from '../components/projects/ProjectsList';
import ProjectSummary from '../components/project-summary/ProjectSummary';
import UpsertProject from '../components/project-upsert/UpsertProject';
import Home from '../components/home/Home';
import Stats from '../components/stats/Stats';
import Review from '../components/review/Review';
import NotFound from '../components/not-found/NotFound';

//import {AdminReducer} from '../reducers/index';

import * as reducers from '../reducers/';


const rootReducer = combineReducers({	//Add other reducers later
  ...reducers
});


const store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension()
);

render(
    (<Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="projects" component={ProjectsList}/> 
            <Route path="project-summary/:id" component={ProjectSummary}/>
            <Route path="project-upsert" component={UpsertProject}/>  
            <Route path="admin" component={Admin} > 
              <Route path="rights" component={Rights} />
              <Route path="features" component={Features} />
              <Route path="tags" component={Tags} />
              <Route path="tech" component={Tech} />
              <Route path="techscope" component={TechScope} />
            </Route>
            <Route path="stats" component={Stats} /> 
            <Route path="review" component={Review} /> 
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>) 
, document.getElementById('root')
);