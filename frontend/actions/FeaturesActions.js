import featureService from "../services/featureService";

export function filterFeaturesDetails(search) {
    return {
        type: 'FILTER_FEATURES_DETAILS',
        search: search
    };
}
export function getAllFeatures(){
    return {
        type: 'GET_ALL_FEATURES'
    }
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
/*
export function getAllFeatures() {
    return dispatch => {
        dispatch({
            type:'FEATURES_DETAILS_GET_ALL_START_LOADING'
        });
        return featureService.getAllFeatures()
            .then( res =>  {
                debugger;
                dispatch({
                    type: 'FEATURES_DETAILS_GET_ALL_SUCCESS',
                    data: res
                });
            })
            .catch( err => {
                dispatch({
                    type: 'FEATURES_DETAILS_GET_ALL_ERROR',
                    error: err
                });
            })
        ;
    }
}
    */