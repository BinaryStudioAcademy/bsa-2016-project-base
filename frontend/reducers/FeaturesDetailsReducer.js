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
    search: ''
};

export default function FeaturesDetailsReducer(state = initialState, action) {
    switch (action.type) {

        case 'FILTER_FEATURES_DETAILS':
            const { search } = action;

            return Object.assign({}, state, {
                search: search
            });

        default:
            return state;
    }

};