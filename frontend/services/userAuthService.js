import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../constants/Api';

class UserAuthService {

    constructor(){
        this.url = constants.URL + "user/";
    }

    getAuthUser(serverUID) {
        return fetch(this.url + serverUID,constants.cookieMarker);
    }
}

const userAuthService = new UserAuthService();
export default userAuthService;