/**
 * Created by user on 04.08.2016.
 */

const initialState = {
    techs: [],
    searchPattern: "pat"
};
for (let i = 1; i < 15; i++){
    initialState.techs.push({techName: "tech"+i, techDescription: "desc"+i})
}
export default function techsAdminReducer(state = initialState, action) {
    console.log("reduce action "+JSON.stringify(action))
    switch (action.type){
        case "ADD_TECH":
            return Object.assign({}, state,
                {techs: state.techs.concat([action.tech])})


        case "UPDATE_TECHS":
            return Object.assign({}, state,
                {techs: action.techs});


        case "MODIFY_SEARCH_PATTERN":
            return Object.assign({}, state,
                {searchPattern: action.searchPattern});


        case "TOGGLE_TECH_SELECT":
            let newTechs = state.techs.slice();
            let techToModify = newTechs.find(tech=>tech.techName === action.tech.techName);
            techToModify.isSelected = !techToModify.isSelected;
            return Object.assign({}, state,
                {techs: newTechs})


        case "SELECT_ALL_TECHS":
            let _newTechs = state.techs.slice();//_newTechs - there is already variable newtechs
            _newTechs.forEach(tech=>tech.isSelected = true);
            return Object.assign({}, state,
                {techs: _newTechs})

        case "REMOVE_SELECTED_TECHS":
            //remove selected from database
            return Object.assign({}, state,
                {techs: state.techs.filter(tech=>!tech.isSelected)})
    }
    return state;
};