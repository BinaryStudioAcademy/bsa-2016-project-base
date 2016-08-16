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

export function changeCheckedSections(listCheckedSections, checked, id) {
    if(checked) {
        return {
            type: 'CHANGE_CHECKED_SECTIONS',
            listCheckedSections: [...listCheckedSections, id]
        }
    } else {
        return {
            type: 'CHANGE_CHECKED_SECTIONS',
            listCheckedSections: listCheckedSections.filter(function(el) {
                if(el == id) {
                    return false;
                } else {
                    return true;
                }
            })
        }
    }
}

export function markedAllFeatures(features, flagChecked, listCheckedFeatures){
    if(flagChecked) {
        return {
            type: 'MARKED_ALL_FEATURES',
            listCheckedFeatures: features.map(function(el, index) {
                return el._id
            }),
            flagChecked: flagChecked,
            features: features
        }
    }
        else {
            return {
                type: 'MARKED_ALL_FEATURES',
                listCheckedFeatures: [],
                flagChecked: flagChecked,
                features: features
            }
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
                dispatch({
                    type: 'GET_ALL_FEATURES_OF_ALL_PROJECTS_LOADING_ERROR',
                    error: err
                });
                dispatch ({
                    type: 'GET_ALL_FEATURES_OF_ALL_PROJECTS',
                    features: [],
                })
            });
    }
}

export function addNewFeature(features, newFeature) {
    /*
    featureService.addNewFeature(newFeature);
    return {
        type: 'ADD_NEW_FEATURE',
        features: features,
        newFeature: newFeature
    }
*/
    return dispatch => {
        return featureService.addNewFeature(newFeature)
            .then(res=>res.json())
            .then(res=>{
                dispatch ({
                    type: 'ADD_NEW_FEATURE',
                    features: features,
                    newFeature: res
                })})
            .catch( err => {
                dispatch({
                    type: 'ADD_NEW_FEATURE_LOADING_ERROR',
                    error: err
                });
            });
    }
}

export function addCheckedFeature(listCheckedFeatures, newCheckedFeatures) {
    return {
        type: 'ADD_CHECKED_FEATURE',
        listCheckedFeatures: [...listCheckedFeatures, newCheckedFeatures],
    }
}

export function removeCheckedFeature(listCheckedFeatures, checkedFeatures) {
    return {
        type: 'REMOVE_CHECKED_FEATURE',
        listCheckedFeatures: listCheckedFeatures.filter(function(el) {
            if(el == checkedFeatures) {
                return false
            } else {
                return true;
            }
        }),
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