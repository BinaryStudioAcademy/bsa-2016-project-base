const initialState = {
    sections: [],
    filter: '',
    flagChecked: false,
    listCheckedSections: [],
    visibilityForm: 'hidden'
};

export default function SectionsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_SECTIONS': {
            const {sections} = action;
            return Object.assign({}, state, {sections: sections})
        }
        case 'GET_ALL_SECTIONS_LOADING_ERROR': {
            return Object.assign({}, state, {
                error: action.error
            });
        }
        case 'ADD_NEW_SECTIONS': {
            const {sections, newSection} = action;
            return Object.assign({}, state, {sections: sections.concat(newSection)});
        }
        case 'ADD_CHECKED_SECTION' : {
            const {listCheckedSections} = action;
            return Object.assign({}, state, {listCheckedSections: listCheckedSections})
        }
        case 'REMOVE_CHECKED_SECTION' : {
            const {listCheckedSections} = action;
            return Object.assign({}, state, {listCheckedSections: listCheckedSections})
        }
        case 'FILTER_SECTIONS': {
            const {filter} = action;
            return Object.assign({}, state, {filter: filter});
        }
        case 'REMOVE_SELECTED_SECTIONS': {
            return Object.assign({}, state, {listCheckedSections: []});
        }
        case 'MARKED_ALL_SECTIONS': {
            const {listCheckedSections, flagChecked} = action;
            return Object.assign({}, state, {listCheckedSections: listCheckedSections}, {flagChecked: flagChecked});
        }
        case 'EDIT_SECTION_ERROR': {
            return Object.assign({}, state, {
                error: action.error
            });
        }
        case 'CHANGE_VISIBILITY_FORM_SECTIONS': {
            const {visibilityForm} = action;
            return Object.assign({}, state, {visibilityForm: visibilityForm});
        }
        default: {
            return state;
        }
    }
};
