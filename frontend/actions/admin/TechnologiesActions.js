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
export function initTechnology(listOfTechnologies) {
    return {
        type: 'INIT_TECHNOLOGY' ,
        listOfTechnologies
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

export function toggleTechSelect(tech) {
    return {
        type: "TOGGLE_TECH_SELECT",
        tech
    }
}
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
export function removeTechFromList(id) {
    return {
        type: "REMOVE_TECH",
        id
    }
}

export function removeSelectedTechs() {
    return (dispatch, getState)=> {
        let techs = getState().TechnologiesReducer.techs;
        techs.forEach(tech=> {
            if (tech.isSelected) {
                //TODO: get url from config
                fetch(`/api/technologie/${tech._id}`, {
                    method: 'DELETE'
                }).then(dispatch(removeTechFromList(tech._id)))
            }
        });
    }
}

export function unselectAllTechs() {
    return {
        type: "UNSELECT_ALL_TECHS"
    }
}

