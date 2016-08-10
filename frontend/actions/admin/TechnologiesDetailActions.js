/**
 * Created by razor on 04.08.16.
 */
import fetch from 'isomorphic-fetch'

export function getTechnologies(id) {
    return dispatch=> {
        fetch(`/api/technology/`+id)
            .then(response => (response.status !== 404)?response.json(): {  })
            .then(json => dispatch(initTechnology(json)))
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
        fetch("/api/technology/", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        });
            dispatch(getTechnologies());

    }
}
export function selectAllTechs(technologies) {
    return {
        type: "SELECT_ALL_TECHS",
        listOfTechnologies: technologies
    }
}

