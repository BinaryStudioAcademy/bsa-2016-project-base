/**
 * Created by user on 19.08.2016.
 */

const multiSelectDataPrototype = {
    componentClass:"MultiSelect",
    floatingLabelText:"Type here",
    values: [],
    custom: "",
    tips: []
};
const rangeDateSelectDataPrototype = {
    componentClass:"RangeDateSelect",
    title:"Dates",
    values:[],
    tips:[],
    custom:{}
}
const initialState = {
    currentSearch:{string:"string"},
    showSearch: false,
    selectedTab: 0,
    searchString:"string",
    tags: Object.assign({
        title:"Tags",
        tipsHeader:"Choose tags here"
    },
        multiSelectDataPrototype),
    users: Object.assign({
        title:"Users",
        tipsHeader:"Choose users here"
    },
        multiSelectDataPrototype),
    technologies: Object.assign({
        title:"Technologies",
        tipsHeader:"Choose technologies here"
    },
        multiSelectDataPrototype),
    date: Object.assign({}, rangeDateSelectDataPrototype)
};


export default function HomeSearchReducer(state = initialState, action) {
    switch (action.type) {

        case "SEARCH_UPDATE_CURRENT":
            return Object.assign({}, state, {
                currentSearch:action.currentSearch
            });

        case "SEARCH_UPDATE_STRING":
            return Object.assign({}, state, {
                searchString:action.searchString
            });

        case "SEARCH_SHOW":
            return Object.assign({}, state, {showSearch: true})

        case "SEARCH_DISMISS":
            return Object.assign({}, state, {showSearch: false})

        case "SEARCH_SELECTED_TAB_CHANGED":
            return Object.assign({}, state, {selectedTab: action.tab})

        case "SEARCH_UPDATE_TAGS":
            return Object.assign({}, state, {tags: action.tags})

        case "SEARCH_UPDATE_USERS":
            return Object.assign({}, state, {users: action.users})

        case "SEARCH_UPDATE_TECHNOLOGIES":
            return Object.assign({}, state, {technologies: action.technologies})

        case "SEARCH_UPDATE_DATE":
            return Object.assign({}, state, {date: action.date})

    }
    return state;
}