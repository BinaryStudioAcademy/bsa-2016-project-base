/**
 * Created by razor on 04.08.16.
 */
import fetch from 'isomorphic-fetch'

export function getTechnologies() {
    return dispatch=> {
        fetch(`/api/technology/`)
            .then(response => (response.status !== 404)?response.json(): [])
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
            method: 'POST',
            body: JSON.stringify(params),
            headers: ({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            })
        });
            dispatch(getTechnologies());

    }
}
export function searchTechnology(params) {
    const action = {
        type: 'SEARCH_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
        listOfTechnologiesFiltered: params.listOfTechnologiesFiltered
    };
    return action;
};
export function selectAllTechs(technologies) {
    return {
        type: "SELECT_ALL_TECHS",
        listOfTechnologies: technologies
    }
}
export function setAddFormState(state) {
    return {
        type: "SET_ADD_FORM_STATE",
        formState: state
    }
}
export function removeSelectedTechs(technologies) {
    return dispatch=> {
        technologies.forEach(tech=> {
             if(tech.checked === 'checked') {
                 fetch(`/api/technology/${tech._id}`, {
                     method: 'DELETE'
                 })
             }
        });
       dispatch(getTechnologies())
    }
}

