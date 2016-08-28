/**
 * Created by razor on 04.08.16.
 */
import fetch from 'isomorphic-fetch'
import * as constants from '../../constants/Api';
export function getTechnologies() {
    let error_code;
    return dispatch=> {
        fetch(`/api/technologies/`, constants.cookieMarker)
            .then(response => response.json())
            .then(json => dispatch(initTechnology(json)))
            .catch(error => {
                dispatch(errorHandler('Bad Request'));
                dispatch(initTechnology([]));
            })


    }
}
export function initTechnology(listOfTechno) {
    let listOfTechnologies = listOfTechno || [];
    return {
        type: 'INIT_TECHNOLOGY',
        listOfTechnologies: listOfTechnologies
    }
}
export function saveTechology(params) {
    return dispatch=> {
        fetch("/api/technologies/",  Object.assign({
                method: 'POST',
                body: params
            },  constants.cookieMarker,
            constants.jsonHedeaders
        ))
            .catch(error => dispatch(errorHandler('Bad Request')));
        dispatch(getTechnologies());

    }
}
// export function saveTechology(params) {
//     return dispatch=> {
//         fetch("/api/technologies/", {
//             method: 'POST',
//             body: JSON.stringify(params),
//             headers: ({
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json'
//             }),
//             credentials: constants.cookieMarker
//         })
//             .catch(error => dispatch(errorHandler('Bad Request')));
//         dispatch(getTechnologies());
//
//     }
// }
export function searchTechnology(params) {
    const action = {
        type: 'SEARCH_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
        listOfTechnologiesFiltered: params.listOfTechnologiesFiltered
    };
    return action;
};
export function selectAllTechs(technologies) {
    return {
        type: "SELECT_ALL_TECHS",
        listOfTechnologies: technologies
    }
}
export function setAddFormState(state) {
    return {
        type: "SET_ADD_FORM_STATE",
        formState: state
    }
}
export function removeSelectedTechs(technologies) {
    return dispatch=> {
        technologies.forEach(tech=> {
            if (tech.checked === 'checked') {
                fetch(`/api/technologies/${tech._id}`, {
                    method: 'DELETE'
                }, constants.cookieMarker)
                    .catch(error => dispatch(errorHandler('Bad Request')));
            }
        });
        dispatch(getTechnologies())
    }
}
export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}

