import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../../constants/Api';

var headers =   {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
class UsersRightsService {
  getProjectUsers(projectId,filters) {
     var queryString =  `${API}rights/projects/${projectId}/`;
     if(filters){
        queryString+= 'users/';
        for(var i in filters) {
          queryString += `${i}=${filters[i]}&`;
          console.log(filters[i],i,queryString);
        }
     }
     console.log(queryString);
     return fetch(queryString.substr(0, queryString.length - 1), {
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
  saveProjectUsers(projectId, users){
    return fetch(`${API}rights/projects/${projectId}`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify(users)
    });
  }
}
const usersRightsService = new UsersRightsService();
export default usersRightsService;
