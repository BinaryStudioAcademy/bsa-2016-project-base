const initialState = {
    features: [],
    filter: '',
    listCheckedFeatures: [],
    checkStatesFeatures: {},
    flagChecked: false,
    listCheckedSections: []
};

export default function FeaturesReducer(state = initialState, action) {
    switch (action.type) {
       /* case 'FILTER_FEATURES':
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
            */
        case 'CHANGE_CHECKED_SECTIONS': {
            const {listCheckedSections} = action;
            return Object.assign({}, state, {listCheckedSections: listCheckedSections})
        }

        case 'FILTER_FEATURES':
            const {filter} = action;
            return Object.assign({}, state, { filter: filter});
        case 'MARKED_ALL_FEATURES': {
            const {listCheckedFeatures, flagChecked, features} = action;
            return Object.assign({}, state, {listCheckedFeatures: listCheckedFeatures}, {flagChecked: flagChecked}, {features: features});
        }
        case 'INITIAL_CHECKED_STATE_FEATURES' : {
            const {checkStatesFeatures} = action;
            return Object.assign({}, state, {checkStatesFeatures: checkStatesFeatures})
        }
        case 'ADD_CHECKED_FEATURE' : {
            const {listCheckedFeatures} = action;
            return Object.assign({}, state, {listCheckedFeatures: listCheckedFeatures})
        }
        case 'REMOVE_CHECKED_FEATURE' : {
            const {listCheckedFeatures} = action;
            return Object.assign({}, state, {listCheckedFeatures: listCheckedFeatures})
        }
        case 'GET_ALL_FEATURES': {
            const {features} = action;
            return Object.assign({}, state, {features: features})
        }
        case 'GET_ALL_FEATURES_LOADING_ERROR': {
            return Object.assign({}, state, {
                error: action.error
            });
        }
        case 'ADD_NEW_FEATURE_LOADING_ERROR': {
            return Object.assign({}, state, {
                error: action.error
            });
        }
        case 'ADD_NEW_FEATURE':
            const {features, newFeature} = action;
            return Object.assign({}, state, {features: features.concat(newFeature)});
        case 'REMOVE_SELECTED_FEATURES':
            return Object.assign({}, state, {listCheckedFeatures: []});
        default:
            return state;
    }
};