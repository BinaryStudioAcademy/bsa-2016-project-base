import featureService from "../../services/featureService";

export function filterFeaturesDetails(search) {
    return {
        type: 'FILTER_FEATURES_DETAILS',
        search: search
    };
}

export function changeFeature(key){
    return {
        type: 'CHANGE_CHECKED_FEATURE',
        key: key
    }
}

export function filterFeatures(filter){
    return {
        type: 'FILTER_FEATURES',
        filter: filter
    }
}

export function getAllFeaturesOfAllProjects() {
    return dispatch => {
        return featureService.getAllFeaturesOfAllProjects()
            .then(res=>res.json())
            .then(res=>{
                dispatch ({
                    type: 'GET_ALL_FEATURES_OF_ALL_PROJECTS',
                    features: res,
                })})
            .catch( err => {
                dispatch(errorHandler('Bad Request'));
                dispatch ({
                    type: 'GET_ALL_FEATURES_OF_ALL_PROJECTS',
                    features: [],
                })
            });
    }
}

export function addNewFeature(features, newFeature) {
    return dispatch => {
        return featureService.addNewFeature(newFeature)
            .then(res=>res.json())
            .then(res=>{
                dispatch ({
                    type: 'ADD_NEW_FEATURE',
                    features: features,
                    newFeature: res
                })})
            .catch(error => dispatch(errorHandler('Bad Request')));
    }
}

export function addCheckedFeature(listCheckedFeatures, newCheckedFeatures) {
    return {
        type: 'ADD_CHECKED_FEATURE',
        listCheckedFeatures: [...listCheckedFeatures, newCheckedFeatures],
    }
}

export function removeFeature(listCheckedFeatures) {
    listCheckedFeatures.forEach(function(el){
        featureService.removeFeature(el);
    });
    return {
        type: 'REMOVE_SELECTED_FEATURES',
        listCheckedFeatures: listCheckedFeatures,
    }
}

export function initialCheckStatesFeatures(features, checkStatesFeatures) {
    var a = {};
    features.forEach(function(el, index) {
        a[index] = false;
    });
    return {
        type: 'INITIAL_CHECKED_STATE_FEATURES',
        checkStatesFeatures: a
    }
}

export function changeVisibilityForm(visibilityForm) {
    if(visibilityForm == 'hidden') {
        return {
            type: 'CHANGE_VISIBILITY_FORM',
            visibilityForm: 'visible'
        }
    }
    else if(visibilityForm == 'visible') {
           return {
            type: 'CHANGE_VISIBILITY_FORM',
            visibilityForm: 'hidden'
           }
    }
}

export function editFeature(features, editFeature, index) {
    return dispatch => {
        return featureService.editFeature(editFeature)
            .then(
                dispatch (getAllFeaturesOfAllProjects())
            )
            .catch(error => dispatch(errorHandler('Bad Request')));
    }

}

export function errorHandler(error) {
    return {
        type: 'SOMETHING_GONE_WRONG',
        error: error
    }
}
