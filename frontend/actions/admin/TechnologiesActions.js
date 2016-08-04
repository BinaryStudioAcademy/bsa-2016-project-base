/**
 * Created by razorka on 26.07.16.
 */
import fetch from 'isomorphic-fetch';
export function sendRequest() {
    return dispatch => {
       return fetch('/api/technologie')
            .then(response => response.json())
            .then(json => {
                const action = {
                    type: 'INIT_TECHOLOGY',
                    listOfTechnologies: json,
                };
                dispatch(action);
            })
    };


}
export  function initTechnology(data) {
    const action = {
        type: 'INIT_TECHOLOGY',
        listOfTechnologies: [],
    };
    return action;
}
export function saveTechology(params) {

    const action = {
        type: 'SAVE_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
    };
    return action;

}

export function deleteTechnology(params) {
    const action = {
        type: 'DELETE_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
    };
    return action;
}

export function searchTechnology(params) {
    const action = {
        type: 'SEARCH_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
        listOfTechnologiesFiltered: params.listOfTechnologiesFiltered
    };
    return action;
}
