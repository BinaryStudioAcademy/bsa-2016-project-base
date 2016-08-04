export function addTech(tech){
    console.log("addTechAction (not async)")
    return {
        type: "ADD_TECH",
        tech
    }
}

export function updateTechs(techs = []){
    console.log("searchTechAction (not async)")
    return {
        type: "UPDATE_TECHS",
        techs
    }
}
export function searchTech(searchPattern){
    return dispatch=>{
        //update from server
        console.log("searchTechAction (Async)");
        dispatch(updateTechs(/*new techs*/))
    }
}
export function modifySearchPattern(newSearchPattern){
    return {
        type: "MODIFY_SEARCH_PATTERN",
        newSearchPattern
    }
}
export function toggleTechSelect(tech){
    return {
        type: "TOGGLE_TECH_SELECT",
        tech
    }
}
export function selectAllTeches(){
    return{
        type: "SELECT_ALL_TECHS"
    }
}
export function removeSelectedTechs(){
    return{
        type: "REMOVE_SELECTED_TECHS"
    }
}
