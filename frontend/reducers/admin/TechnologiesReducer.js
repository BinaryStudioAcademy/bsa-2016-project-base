/**
 * Created by razor on 04.08.16.
 */
const initialState = {
    listOfTechnologies: [],
    listOfTechnologiesFiltered:[],
    formState: 'hidden',
    hideFile : 'visible',
    hideForm : 'hidden'
};


export default function technologiesReducer(state = initialState, action) {
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
        case 'SET_IMAGE_FROM_LINK': {
            const {techAvatar} = action;
            return Object.assign({}, state, {
                techAvatar
            })
        }
        case 'SET_ADD_FORM_STATE': {
            const {formState} = action;
            return Object.assign({}, state, {
                formState
            })
        }
        case 'SET_VISIBLE_FORM_BY_LINK': {
            const {hideFile,hideForm} = action;
            return Object.assign({}, state, {
                hideFile,
                hideForm
            })
        }
        case 'DELETE_TECHNOLOGY': {
            const {listOfTechnologies} = action;
            return Object.assign({}, state, {
                listOfTechnologies
            });
        }
        case 'SELECT_ALL_TECHS': {
            const {listOfTechnologies} = action;
            return Object.assign({}, state, {
                listOfTechnologies
            });
        }
        case 'SEARCH_TECHNOLOGY': {
            const {listOfTechnologies, listOfTechnologiesFiltered} = action;
            return Object.assign({}, state, {
                listOfTechnologies,
                listOfTechnologiesFiltered
            })
        }
        default: {
            return state;
        }
    }
}