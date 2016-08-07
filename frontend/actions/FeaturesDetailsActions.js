import featureService from "../services/featureService";

export function filterFeaturesDetails(search) {
    return {
        type: 'FILTER_FEATURES_DETAILS',
        search
    };
}

export function openModal(id) {
    return {
        type: 'FEATURES_DETAILS_MODAL_OPEN',
        id
    }
}

export function closeModal() {
    return {
        type: 'FEATURES_DETAILS_MODAL_CLOSE'
    }
}

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