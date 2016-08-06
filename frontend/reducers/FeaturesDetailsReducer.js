const initialState = {
    features : [
        {
            "id": 1,
            "featureName": "Features 1",
            "isItSubFeature": false,
            "childFeatures": []
        },{
            "id": 2,
            "featureName": "Features 2",
            "isItSubFeature": false,
            "childFeatures": []
        },{
            "id": 3,
            "featureName": "Features 3",
            "isItSubFeature": false,
            "childFeatures": []
        },
        {
            "id": 4,
            "featureName": "Features 4",
            "isItSubFeature": true,
            "childFeatures": []
        },{
            "id": 5,
            "featureName": "Features 5",
            "isItSubFeature": false,
            "childFeatures": [{"id": 4}]
        },{
            "id": 6,
            "featureName": "Features 6",
            "isItSubFeature": false,
            "childFeatures": []
        }
    ],
    search: '',
    showFeaturesDetailsModal: false,
    showFeaturesDetailsId: null
};

export default function FeaturesDetailsReducer(state = initialState, action) {
    switch (action.type) {

        case 'FILTER_FEATURES_DETAILS':
            const { search } = action;

            return Object.assign({}, state, {
                search: search
            });

        case 'FEATURES_DETAILS_MODAL_OPEN':
            return Object.assign({}, state, {
                showFeaturesDetailsModal: true,
                showFeaturesDetailsId: action.id
            });

        case 'FEATURES_DETAILS_MODAL_CLOSE':
            return Object.assign({}, state, {
                showFeaturesDetailsModal: false,
                showFeaturesDetailsId: null
            });
        case 'FEATURES_DETAILS_GET_ALL_START_LOADING': {
            return Object.assign({}, state, {
                isLoading: true
            });    
        }
        case 'FEATURES_DETAILS_GET_ALL_SUCCESS': {
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data
            });    
        }
        case 'FEATURES_DETAILS_GET_ALL_ERROR': {
            return Object.assign({}, state, {
                isLoading: false,
                error: action.error
            });    
        }
        // case 'SHOW_DETAILS_IN_MODAL':
        //     return Object.assign({}, state, {
        //         showFeaturesDetails: action.id
        //     });
        default:
            return state;
    }
};