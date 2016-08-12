/**
 * Created by razor on 04.08.16.
 */
const initialState = {
    listOfTechnologies: [],
    listOfTechnologiesFiltered:[],
    formState: 'hidden'
};


export default function technologieReducer(state = initialState, action) {

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
        case 'SET_ADD_FORM_STATE': {
            const {formState} = action;
            return Object.assign({}, state, {
                formState
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