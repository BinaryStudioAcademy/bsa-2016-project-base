import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../../constants/Api';

class AdminRightsService {

  getProjectUsers(projectId) {
     return fetch('http://localhost:3000/api/rights/projects/57acc61ab781f506fe6ca72a');
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
