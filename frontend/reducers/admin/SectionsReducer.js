const initialState = {
    sections: []
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
        case 'ADD_NEW_SECTIONS':
            const {sections, newSection} = action;
            return Object.assign({}, state, {sections: sections.concat(newSection)});
        default: {
            return state;
        }
    }
};
