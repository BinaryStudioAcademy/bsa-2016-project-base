/**
 * Created by razor on 04.08.16.
 */
const initialState = {
    listOfTechnologies: [],
    listOfTechnologiesFiltered:[]
};


export default function patentDetailsReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'INIT_TECHNOLOGY': {
            console.log(action);
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