import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { API } from '../../constants/Api';

promise.polyfill();

var headers =   {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

class UsersRightsService {
  getProjectUsers(projectId,filterName, usersRight) {
    var queryString =  `${API}rights/projects/${projectId}/`;
    if(filterName || usersRight){
       queryString+= 'users/';
       if(filterName) queryString +=`filterName=${filterName}`;
       if(filterName && usersRight) queryString+="&";
       if(usersRight)  queryString +=`usersRight=${usersRight}`;
    }
    return fetch(queryString, {
      method: 'GET',
      headers: headers
    });
  }
  getProjectsList() {
    return fetch(`${API}rights/projects/`, {
      method: 'GET',
      headers: headers
    });
  }
  saveProjectUsers(projectId, data){       
    return fetch(`${API}rights/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers
    });
  }
}

const usersRightsService = new UsersRightsService();
export default usersRightsService;
