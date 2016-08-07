import featureService from "../services/featureService";

export function filterFeaturesDetails(search) {
    return {
        type: 'FILTER_FEATURES_DETAILS',
        search: search
    };
}

export function getAllSections(){
    return {
        type: 'GET_ALL_SECTIONS'
    }
}

export function changeFeature(key){
    return {
        type: 'CHANGE_CHECKED_FEATURE',
        key: key
    }
}

export function markedAllFeatures(flag){
    return {
        type:  'MARKED_ALL_FEATURES',
        flag:flag
    }
}

export function filterFeatures(filter){
    return {
        type: 'FILTER_FEATURES',
        filter: filter
    }
}

export function getAllFeatures() {
    return dispatch => {
        return featureService.getAllFeatures()
            .then(res=>res.json())
            .then(res=>{
                dispatch ({
                    type: 'GET_ALL_FEATURES',
                    features: res,
                })})
            .catch( err => {
                dispatch({
                    type: 'GET_ALL_FEATURES_LOADING_ERROR',
                    error: err
                });
            });
    }
}

export function addNewFeature(features, newFeature) {
    featureService.addNewFeature(newFeature);
    return {
        type: 'ADD_NEW_FEATURE',
        features: features,
        newFeature: newFeature
    }
}