import sectionService from '../../services/sectionService';

export function getAllSections() {
    return dispatch => {
        return sectionService.getAllSections()
            .then(res=>res.json())
            .then(res=> {
                dispatch({
                    type: 'GET_ALL_SECTIONS',
                    sections: res,
                })})
            .catch( err => {
                dispatch({
                    type: 'GET_ALL_SECTIONS_LOADING_ERROR',
                    error: err
                });
            });
    }
}

export function addNewSection(sections, newSection) {
    sectionService.addNewSection(newSection);
    return {
        type: 'ADD_NEW_SECTIONS',
        sections: sections,
        newSection: newSection
    }
}







/*
 const action = {
 type: 'GET_ALL_SECTIONS',
 data: {f: "fs"}
 };
 return action;
 */