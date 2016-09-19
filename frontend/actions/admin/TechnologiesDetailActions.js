import fetch from 'isomorphic-fetch'
import * as constants from '../../constants/Api';
import UploadService  from '../../services/UploadService';
import TechnologieService  from '../../services/TechnologieService';

export function getTechnologies(id) {
    return dispatch=> {
        return TechnologieService.getTech(id)
            .then(response => (response.status !== 404) ? response.json() : {})
            .then(json => dispatch(initTechnology(json)))
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}

export function initTechnology(listOfTechno) {
    let listOfTechnologies = listOfTechno || [];
    return {
        type: 'INIT_TECHNOLOGY',
        listOfTechnologies: listOfTechnologies
    }
}

export function deleteImage(path, id) {
    return dispatch => {
        return UploadService.deleteFile(path)
            .then(response => {
                if (response.ok) {
                    dispatch(getTechnologies(id));
                } else {
                    dispatch(errorHandler('Bad Request'))
                }
            })


    }
}

export function updateData(id, data) {
    return dispatch=> {
        return TechnologieService.updateData(id, data)
            .then(response => {
                    if (response.status != 200) {
                        throw Error(response.statusText);
                    }
                }
            )
            .catch(error => dispatch(errorHandler('Bad Request')));
        dispatch(getTechnologies(id))
    }
}

export function uploadFileByLink(link) {
    return dispatch=> {
        return UploadService.uploadFileByLink(link)
            .then(response => response.json())
            .then(json => dispatch(setImageFromLinkDetail(json)))
            .catch(error=> {
                dispatch(errorHandler('Bad Request'))
            });

    }
}

export function uploadFileByFile(file) {
    return dispatch=> {
        return UploadService.uploadFileByFile(file)
            .then(response => response.json())
            .then(json => dispatch(setImageFromLinkDetail(json)))
            .catch(error=> {
                dispatch(errorHandler('Bad Request'))
            });

    }
}

export function setImageFromLinkDetail(img) {
    return {
        type: 'SET_IMAGE_FROM_LINK_DETAIL',
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

export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}
