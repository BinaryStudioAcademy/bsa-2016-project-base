const initialState = {
    features: [],
    filter: '',
    listCheckedFeatures: [],
    flagChecked: false,
    listCheckedSections: [],
    visibilityForm: 'hidden'
};

export default function FeaturesReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_CHECKED_SECTIONS': {
            const {listCheckedSections} = action;
            return Object.assign({}, state, {listCheckedSections: listCheckedSections})
        }

        case 'CHANGE_VISIBILITY_FORM': {
            const {visibilityForm} = action;
            return Object.assign({}, state, {visibilityForm: visibilityForm});
    }

        case 'FILTER_FEATURES': {
            const {filter} = action;
            return Object.assign({}, state, {filter: filter});
        }

        case 'MARKED_ALL_FEATURES': {
            const {listCheckedFeatures, flagChecked} = action;
            return Object.assign({}, state, {listCheckedFeatures: listCheckedFeatures}, {flagChecked: flagChecked});
        }

        case 'ADD_CHECKED_FEATURE' : {
            const {listCheckedFeatures} = action;
            return Object.assign({}, state, {listCheckedFeatures: listCheckedFeatures})
        }
        case 'REMOVE_CHECKED_FEATURE' : {
            const {listCheckedFeatures} = action;
            return Object.assign({}, state, {listCheckedFeatures: listCheckedFeatures})
        }
        case 'GET_ALL_FEATURES_OF_ALL_PROJECTS': {
            const {features} = action;
            return Object.assign({}, state, {features: features})
        }
        case 'GET_ALL_FEATURES_OF_ALL_PROJECTS_LOADING_ERROR': {
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