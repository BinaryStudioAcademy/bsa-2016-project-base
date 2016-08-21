/**
 * Created by user on 19.08.2016.
 */

const initialState = {
<<<<<<< HEAD
    currentSearch:{string:"string"},
    showSearch: false,
    selectedTab: 1,
    searchString:"string",
    tags: {
        title:"Tags",
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
        title:"Users",
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
        title:"Technologies",
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
        title:"Dates",
        values:[
            {upper:new Date(), lower:new Date()}
        ],
        tips:[],
        custom:{}
    }
};

<<<<<<< HEAD

=======
    showSearch: true,
    selectedTab: 1,
=======
/**
 *      searchString,
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
>>>>>>> parent of 18f731c... velo

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
>>>>>>> parent of 7f3edc1... combined search and project view together
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