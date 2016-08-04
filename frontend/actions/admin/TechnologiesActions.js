/**
 * Created by razorka on 26.07.16.
 */
import fetch from 'isomorphic-fetch';
export function initTechnology() {
    // return dispatch => {
    //    return fetch('/api/technologie')
    //         .then(response => response.json())
    //         .then(json => {
    //             const action = {
    //                 type: 'INIT_TECHNOLOGY',
    //                 listOfTechnologies: json,
    //             }
    //         })
    //
    // };
    let result;
    const promise = fetch('/api/technologie');
    promise.then(function (response) {
        result = response.json();
        console.log(result);
    });
    console.log(result);
    const action ={
        type: 'INIT_TECHNOLOGY',
    }
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
