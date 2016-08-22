/**
 * Created by razor on 04.08.16.
 */
import fetch from 'isomorphic-fetch'

export function getTechnologies(id) {
    return dispatch=> {
        fetch(`/api/technologies/`+id)
            .then(response => response.json())
            .then(json => dispatch(initTechnology(json)))
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}
export function initTechnology(listOfTechno) {
    let listOfTechnologies = listOfTechno || [];
    return {
        type: 'INIT_TECHNOLOGY' ,
        listOfTechnologies : listOfTechnologies
    }
}
export function saveTechology(params) {
    return dispatch=> {
        fetch("/api/technologies/", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}
export function deleteImage(path,id) {
    return dispatch => {
        fetch('/api/file/',{
            method: 'DELETE',
            body: JSON.stringify({file:path}),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
            .catch(error => dispatch(errorHandler('Bad Request')));

        dispatch(getTechnologies(id));
    }
}
export function updateData(id,data){
    return dispatch=> {
        fetch(`/api/technologies/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        })
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