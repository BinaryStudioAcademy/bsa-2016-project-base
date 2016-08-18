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

export function addCheckedSection(listCheckedSections, newCheckedSection) {
    return {
        type: 'ADD_CHECKED_SECTION',
        listCheckedSections: [...listCheckedSections, newCheckedSection],
    }
}

export function removeCheckedSection(listCheckedSections, checkedSection) {
    return {
        type: 'REMOVE_CHECKED_SECTION',
        listCheckedSections: listCheckedSections.filter(function(el) {
            if(el == checkedSection) {
                return false
            } else {
                return true;
            }
        }),
    }
}

export function filterSections(filter){
    return {
        type: 'FILTER_SECTIONS',
        filter: filter
    }
}

export function removeSections(listCheckedSections) {
    listCheckedSections.forEach(function(el){
        sectionService.removeSection(el);
    });
    return {
        type: 'REMOVE_SELECTED_SECTIONS',
        listCheckedSections: listCheckedSections,
    }
}

export function editSection(sections, editSection, index) {
    return dispatch => {
        return sectionService.editSection(editSection)
            .then(
                dispatch (getAllSections())
            )
            .catch( err => {
                dispatch({
                    type: 'EDIT_SECTION_ERROR',
                    error: err
                });
            });
    }

}

export function changeVisibilityFormSections(visibilityForm) {
    if(visibilityForm == 'hidden') {
        return {
            type: 'CHANGE_VISIBILITY_FORM_SECTIONS',
            visibilityForm: 'visible'
        }
    }
    else if(visibilityForm == 'visible') {
        return {
            type: 'CHANGE_VISIBILITY_FORM_SECTIONS',
            visibilityForm: 'hidden'
        }
    }
}