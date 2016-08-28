/**
 * Created by razor on 04.08.16.
 */
import fetch from 'isomorphic-fetch'
import * as constants from '../../constants/Api';
export function getTechnologies(id) {
    return dispatch=> {
        fetch(`/api/technologies/` + id, constants.cookieMarker)
            .then(response => (response.status !== 404) ? response.json() : {})
            .then(json => dispatch(initTechnology(json)))
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}
export function initTechnology(listOfTechno) {
    let listOfTechnologies = listOfTechno || [];
    return {
        type: 'INIT_TECHNOLOGY',
        listOfTechnologies: listOfTechnologies
    }
}
export function deleteImage(path, id) {
    return dispatch => {
        fetch('/api/file/', Object.assign({
                method: 'DELETE',
                body: JSON.stringify({file: path})
            }, constants.cookieMarker,
            constants.jsonHedeaders
        ))
            .catch(error => dispatch(errorHandler('Bad Request')));

        dispatch(getTechnologies(id));
    }
}
export function updateData(id, data) {
    return dispatch=> {
        fetch(`/api/technologies/${id}`,
            Object.assign({
                    method: 'PUT',
                    body: JSON.stringify(data)
                }, constants.cookieMarker,
                constants.jsonHedeaders
            ))
            .catch(error => dispatch(errorHandler('Bad Request')));
        dispatch(getTechnologies(id));

    }
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}
