const initialState = {
    listOfTechnologies: [],
    hideFile : 'visible',
    hideForm : 'hidden'
};

export default function technologiDetaileReducer(state = initialState, action) {
    switch (action.type) {
        case 'INIT_TECHNOLOGY': {
            const {listOfTechnologies} = action;
            return Object.assign({}, state, {
                listOfTechnologies
            })
        }
        case 'SAVE_TECHNOLOGY': {
            const {listOfTechnologies} = action;
            return Object.assign({}, state, {
                listOfTechnologies
            })
        }
        case 'DELETE_TECHNOLOGY': {
            const {listOfTechnologies} = action;
            return Object.assign({}, state, {
                listOfTechnologies
            });
        }
        case 'SET_IMAGE_FROM_LINK_DETAIL': {
            const {techAvatar} = action;
            let {listOfTechnologies} = state;
            listOfTechnologies.techAvatar = techAvatar;
            return Object.assign({}, state, {
                listOfTechnologies
            })
        }
        case 'SET_VISIBLE_FORM_BY_LINK': {
            const {hideFile,hideForm} = action;
            return Object.assign({}, state, {
                hideFile,
                hideForm
            })
        }
        default: return state;
    }
}