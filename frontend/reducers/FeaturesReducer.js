const initialState = {
    features: []
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
        case 'GET_ALL_FEATURES': {
            const {features} = action;
            return Object.assign({}, state, {features: features})
        }
        case 'GET_ALL_FEATURES_LOADING_ERROR': {
            return Object.assign({}, state, {
                error: action.error
            });
        }
        case 'ADD_NEW_FEATURE':
            const {features, newFeature} = action;
            return Object.assign({}, state, {features: features.concat(newFeature)});
        default:
            return state;
    }
};