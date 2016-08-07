const initialState = {
    features : [
        {
            "id": "1",
            "featureName": "Features 1"
        },{
            "id": "2",
            "featureName": "Features 2"
        },{
            "id": "3",
            "featureName": "Features 3"
        },
        {
            "id": "4",
            "featureName": "Features 4"
        },{
            "id": "5",
            "featureName": "Features 5"
        },{
            "id": "6",
            "featureName": "Features 6"
        }
    ],
    filter: ""
};

export default function FeaturesReducer(state = initialState, action) {
    switch (action.type) {
        case 'FILTER_FEATURES':
            return Object.assign({}, state, {
                filter: action['filter']
            });
        case 'CHANGE_CHECKED_FEATURE':
            var newState = Object.assign({}, state),
                index = newState['features'].findIndex((item) => (item['id'] == action['key']));
            if(index !=-1) newState.features[index].checked = !newState.features[index].checked;
            return newState;
        case 'MARKED_ALL_FEATURES':
            var newState = Object.assign({}, state);
            for(var i in newState.features) newState.features[i].checked = action['flag'];
            return newState;
        default:
            return state;
    }
};