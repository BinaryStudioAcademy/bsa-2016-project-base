import * as types from '../constants/FeaturesActionTypes';

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

export function setAllFeatures(features) {
    return {
        type: types.FEATURES_DETAILS_SET_ALL_FEATURES,
        features
    }
}