/**
 * Created by razor on 04.08.16.
 */
import fetch from 'isomorphic-fetch'

export function getTechnologies() {
    return dispatch=> {
        fetch(`/api/technologie/`)
            .then(response => response.json())
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
        fetch("/api/technologie/", {
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
export function selectAllTechs(technologies,action) {
    let allChecked;
    if(action != 'add'){
        allChecked = false;
    }else{
        allChecked = 'checked';
    }
    return {
        type: "SELECT_ALL_TECHS",
        listOfTechnologiesChecked: technologies,
        allChecked : allChecked
    }
}
export function removeSelectedTechs(technologies) {
    return (dispatch, getState)=> {
        technologies.forEach(tech=> {
                fetch(`/api/technologie/${tech}`, {
                    method: 'DELETE'
                })
        });
        dispatch(initTechnology())
    }
}

export function unselectAllTechs() {
    return {
        type: "UNSELECT_ALL_TECHS"
    }
}
