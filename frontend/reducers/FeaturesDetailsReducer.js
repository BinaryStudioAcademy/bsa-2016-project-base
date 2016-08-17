import * as types from '../constants/FeaturesActionTypes';

const initialState = {
    features : [],
    subfeatures: null,
    search: '',
    showFeaturesDetailsModal: false,
    showFeaturesDetailsId: null
};

export default function FeaturesDetailsReducer(state = initialState, action) {
    switch (action.type) {

        case types.FILTER_FEATURES_DETAILS:
            const { search } = action;

            return Object.assign({}, state, {
                search: search
            });

        case types.FEATURES_DETAILS_MODAL_OPEN:
            const feature = state.features.filter(feature => feature._id === action.id)[0];
            if (!feature.childFeatures) {
                return Object.assign({}, state, {
                    showFeaturesDetailsModal: true,
                    showFeaturesDetailsId: action.id,
                    subfeatures: null
                });
            }

            const subFeaturesId = feature.childFeatures.map(id => state.features.filter(feature => feature._id === id)[0]);
            return Object.assign({}, state, {
                showFeaturesDetailsModal: true,
                showFeaturesDetailsId: action.id,
                subfeatures: subFeaturesId
            });

        case types.FEATURES_DETAILS_MODAL_CLOSE:
            return Object.assign({}, state, {
                showFeaturesDetailsModal: false,
                showFeaturesDetailsId: null,
                subfeatures: null
            });

        case types.FEATURES_DETAILS_SET_ALL_FEATURES: {
            return Object.assign({}, state, {
                isLoading: false,
                features: action.features
            });
        }

        default:
            return state;
    }
};