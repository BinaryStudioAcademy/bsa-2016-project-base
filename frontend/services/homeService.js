import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import { API } from '../constants/Api';

class HomeService {

    getAllProjects() {
        return fetch(`${API}mainpage`);
    }

    getAllFeaturesSorted(orderBy) {
        return fetch(`${API}mainpage/${orderBy}`);
    }
<<<<<<< HEAD
<<<<<<< HEAD
    getProjects(query){
        return this.getAllProjects();
    }
=======

>>>>>>> parent of 7f3edc1... combined search and project view together
=======
    getProjects(){
        return this.getAllProjects();
    }

>>>>>>> parent of 18f731c... velo
}

const homeService = new HomeService();
export default homeService;