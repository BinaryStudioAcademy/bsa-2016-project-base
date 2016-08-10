import * as types from '../constants/FeaturesActionTypes';
import featureService from '../services/featureService';

export function filterFeaturesDetails(search) {
    return {
        type: types.FILTER_FEATURES_DETAILS,
        search
    };
}

export function openModal(id) {
    return {
        type: types.FEATURES_DETAILS_MODAL_OPEN,
        id
    }
}

export function closeModal() {
    return {
        type: types.FEATURES_DETAILS_MODAL_CLOSE
    }
}

export function getAllFeatures(projectId) {
    return dispatch => {
        dispatch({
            type: types.FEATURES_DETAILS_GET_ALL_START_LOADING
        });

        return featureService.getAllFeatures(projectId)
            .then( res =>  {
                return res.json();
            })
            .then(function(data) {
                console.log(data);
                dispatch({
                    type: types.FEATURES_DETAILS_GET_ALL_SUCCESS,
                    data: data
                });
            })
            .catch( err => {
                dispatch({
                    type: types.FEATURES_DETAILS_GET_ALL_ERROR,
                    error: err
                });
            });
    }
}