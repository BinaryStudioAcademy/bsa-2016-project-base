/**
 * Created by razor on 04.08.16.
 */
import TechnologieService  from '../../services/TechnologieService';
import UploadService  from '../../services/UploadService';
export function getTechnologies() {
    return dispatch=> {
        TechnologieService.getAllTechnologies()
            .then(response => response.json())
            .then(json => dispatch(initTechnology(json)))
            .catch(error => {
                dispatch(errorHandler('Bad Request'));
                dispatch(initTechnology([]));
            })
    }
}
export function uploadFileByLink(link) {
    return dispatch=> {
        UploadService.uploadFileByLink(link)
            .then(response => response.json())
            .then(json => dispatch(setImageFromLink(json)))
            .catch(dispatch(errorHandler('Bad Request')));

    }
}
export function uploadFileByFile(file) {
    return dispatch=> {
        UploadService.uploadFileByFile(file)
            .then(response => response.json())
            .then(json => dispatch(setImageFromLink(json)))
            .catch(dispatch(errorHandler('Bad Request')));

    }
}
export function setImageFromLink(img) {
    return {
        type: 'SET_IMAGE_FROM_LINK',
        techAvatar: '/upload/resources/tech/' + img.link
    }
}
export function setVisibleUploadByLink(hideFile, hideForm) {
    return {
        type: 'SET_VISIBLE_FORM_BY_LINK',
        hideFile: hideFile,
        hideForm: hideForm
    }
}
export function deleteImageFromList(img) {
    return dispatch => {
        UploadService.deleteFile(img)
            .then(dispatch(setImageFromLinkAfterDelete()))
            .catch(dispatch(errorHandler('Bad Request')));
    }
}
export function setImageFromLinkAfterDelete() {
    return {
        type: 'SET_IMAGE_FROM_LINK',
        techAvatar: undefined
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
        TechnologieService.saveTechnology(params)
            .catch(dispatch(errorHandler('Bad Request')));
        dispatch(getTechnologies());
        dispatch(setImageFromLinkAfterDelete());

    }
}
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
                    TechnologieService.deleteTechnology(tech._id)
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

