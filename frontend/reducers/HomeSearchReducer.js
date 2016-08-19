/**
 * Created by user on 19.08.2016.
 */

const initialState = {
    showSearch: true,
    selectedTab: 1,

    tags: {
        values: [
            {text: "tag1"},
            {text: "tag2"},
            {text: "tag3"}
        ],
        custom: "cus",
        tips: [
            {text: "tip1"},
            {text:"tip2"}
        ]
    },
    users: {
        values: [
            {text: "user1"},
            {text: "user2"},
            {text: "user3"}
        ],
        custom: "user",
        tips: [
            {text: "tip1"},
            {text:"tip2"}
        ]
    },
    technologies: {
        values: [
            {text: "tech1"},
            {text: "tech2"},
            {text: "tech3"}
        ],
        custom: "cus",
        tips: [
            {text: "tip1"},
            {text:"tip2"}
        ]
    },
    date: {
        values:[
            {upper:new Date(), lower:new Date()}
        ],
        tips:[],
        custom:{}
    }
};

/**
 *      showSearch,
 *      selectedTab,
 *      data:{
             *          tags: {values, custom, tips},
             *          users: {values, custom, tips},
             *          technologies: {values, custom, tips},
             *          date: {upper,lower}
             *      }
 * }
 */
export default function HomeSearchReducer(state = initialState, action) {
    switch (action.type) {

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