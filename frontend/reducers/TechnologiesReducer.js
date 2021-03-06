const initialState = {
    techs: [],
    searchPattern: "",
    newTech: {
        techName: "newName", 
        techDescription: "new desc"
    }
};

export default function technologiesReducer(state = initialState, action) {
    switch (action.type){
        case "ADD_TECH":
            state.newTech = {techName: "", techDescription: ""};
            return Object.assign({}, state,
                {techs: state.techs.concat([action.tech])})

        case "UPDATE_TECHS":
            return Object.assign({}, state,
                {techs: action.techs});

        case "MODIFY_SEARCH_PATTERN":
            return Object.assign({}, state,
                {searchPattern: action.newSearchPattern});

        case "TOGGLE_TECH_SELECT":
            let newTechs = state.techs.slice();
            let techToModify = newTechs.find(tech=>tech._id === action.tech._id);
            techToModify.isSelected = !techToModify.isSelected;
            return Object.assign({}, state,{techs: newTechs});

        case "SELECT_ALL_TECHS":
            let _newTechs = state.techs.slice();
            _newTechs.forEach(tech=>tech.isSelected = true);
            return Object.assign({}, state,{techs: _newTechs});

        case "REMOVE_TECH":
            return Object.assign({}, state,
                {techs: state.techs.filter(tech=>tech._id !== action.id)})

        case "UNSELECT_ALL_TECHS":
            let __newTechs = state.techs.slice();
            __newTechs.forEach(tech=>tech.isSelected = false);
            return Object.assign({}, state,{techs: __newTechs})

        case "MODIFY_NEW_TECH":
            return Object.assign({}, state,{
                newTech: Object.assign({}, 
                    state.newTech, 
                    action.modifiedPartOfTech
                )
            })
    }
    return state;
};