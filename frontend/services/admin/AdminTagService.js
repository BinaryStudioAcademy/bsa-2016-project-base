import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';
import * as constants from '../../constants/Api';

class AdminTagService {

    constructor(){
        this.url = constants.URL + "tags";
    }

    getAllTags() {
        return fetch(this.url,constants.cookieMarker);
    }

    deleteTags(tags) {
        return fetch(this.url,Object.assign({
                method: "DELETE",
                body: JSON.stringify(tags)
            },  constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

    addTag(tag) {
        return fetch(this.url,Object.assign({
                method: "POST",
                body: JSON.stringify(tag)
            },  constants.cookieMarker,
                constants.jsonHedeaders
            )
        );
    }

}

const adminTagService = new AdminTagService();
export default adminTagService;