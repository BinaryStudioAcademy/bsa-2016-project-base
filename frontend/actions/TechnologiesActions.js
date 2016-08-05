/**
 * Created by razor on 04.08.16.
 */
import techService from "./../services/TechnologieService"
export function addTechToList(tech) {
    return {
        type: "ADD_TECH",
        tech
    }
}
export function getTeches() {
    return dispatch=> {
        techService.getAllTechnologies()
            .then(response => response.json())
            .then(json => dispatch(updateTechs(json)))
    }
}
export function addTech(tech) {
    return dispatch=> {
        techService.addTechnologie(tech)
            .then(response => response.json())
            .then(json=> {
                dispatch(addTechToList(json))
            })

    }
}
export function updateTechs(techs = []) {
    return {
        type: "UPDATE_TECHS",
        techs
    }
}
export function searchTech(searchPattern) {
    return dispatch=> {
        //TODO: load data from server
    }
}
export function modifySearchPattern(newSearchPattern) {
    return {
        type: "MODIFY_SEARCH_PATTERN",
        newSearchPattern
    }
}
export function toggleTechSelect(tech) {
    return {
        type: "TOGGLE_TECH_SELECT",
        tech
    }
}
export function selectAllTechs() {
    return {
        type: "SELECT_ALL_TECHS"
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
                techService.deleteTechnologie(tech)
                .then(dispatch(removeTechFromList(tech._id)))
            }
        });
    }
}

export function unselectAllTechs() {
    return {
        type: "UNSELECT_ALL_TECHS"
    }
}

export function modifyNewTech(modifiedPartOfTech) {
    return {
        type: "MODIFY_NEW_TECH",
        modifiedPartOfTech
    }
}
