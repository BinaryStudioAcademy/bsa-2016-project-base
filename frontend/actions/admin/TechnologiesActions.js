import UploadService  from '../../services/UploadService';
import TechnologieService  from '../../services/TechnologieService';

export function getTechnologies() {
    return dispatch=> {
        return TechnologieService.getAllTechnologies()
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
        return UploadService.uploadFileByLink(link)
            .then(response => response.json())
            .then(json => dispatch(setImageFromLink(json)))
            .catch(error=> {
                dispatch(errorHandler('Bad Request'))
            });

    }
}

export function uploadFileByFile(file) {
    return dispatch=> {
        return UploadService.uploadFileByFile(file)
            .then(response => response.json())
            .then(json => dispatch(setImageFromLink(json)))
            .catch(error=> {
                dispatch(errorHandler('Bad Request'))
            });

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
        return UploadService.deleteFile(img)
            .then(dispatch(setImageFromLinkAfterDelete()))
            .catch(error=> {
                dispatch(errorHandler('Bad Request'))
            });
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
        return TechnologieService.saveTechnology(params)
            .then(response => {
                    if (response.status != 201) {
                        throw Error(response.statusText);
                    } else {
                        dispatch(getTechnologies());
                        dispatch(setImageFromLinkAfterDelete());
                    }
                }
            )
            .catch(error => dispatch(errorHandler('Bad Request')));

    }
}

export function searchTechnology(params) {
    const action = {
        type: 'SEARCH_TECHNOLOGY',
        listOfTechnologies: params.listOfTechnologies,
        listOfTechnologiesFiltered: params.listOfTechnologiesFiltered
    };
    return action;
}

export function selectAllTechs(technologies,setAllChecked) {
    return {
        type: "SELECT_ALL_TECHS",
        listOfTechnologies: technologies,
        setAllChecked: setAllChecked
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
                return TechnologieService.deleteTechnology(tech._id)
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

