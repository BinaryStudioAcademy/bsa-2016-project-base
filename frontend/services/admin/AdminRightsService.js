import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../../constants/Api';

class AdminRightsService {

  getProjectUsers(projectId) {
    console.log(`${API}projects/${projectId}`);
      return fetch(`${API}projects/${projectId}`);
  }


  getAllProjects() {
      return fetch(`${API}rights/projects/`, {
         method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });
  }
}
const adminRightsService = new AdminRightsService();
export default adminRightsService;
