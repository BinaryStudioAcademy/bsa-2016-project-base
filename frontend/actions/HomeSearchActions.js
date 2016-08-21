/**
 * Created by user on 19.08.2016.
 */
/**
 * {
 *                  updateSearchString
 *                  goSearch
             *      handleSearchShow,
             *      handleSearchDismiss,
             *      selectedTabChanged,
             *      dataReceiver:{
             *          tags,
             *          users,
             *          technologies,
             *          date
             *      }
             * }
 */
    /**{
    *               currentSearch:{string},
    *               searchString,
             *      showSearch,
             *      selectedTab,
             *      data:{
             *          tags: {values, custom, tips},
             *          users: {values, custom, tips},
             *          technologies: {values, custom, tips},
             *          date: {values:[{upper,lower}],
             *              custom:{upper,lower}
             *              tips:[]empty
             *          }
             *      }
             * }
 */

import {getProjects} from "./HomeActions";
export function getQuery(getState){
    return getState().HomeSearchReducer.currentSearch
}
export function getAdvancedQuery(getState){
    const data = getState().HomeSearchReducer;
    return {
        tags: data.tags.values.map(tag=>tag.text),
        users: data.users.values.map(user=>user.text),
        technologies: data.technologies.values.map(tech=>tech.text),
        dates: data.date.values.map(date=> {
            return {
                from: date.lower.getTime(),
                to: date.upper.getTime()
            }
        })
    };
}
export function updateCurrentSearch(currentSearch){
    return {
        type:"SEARCH_UPDATE_CURRENT",
        currentSearch
    }


}
/**
 * @param type {"fast"|"extended"}
 */
export function goSearch(type) {
    return (dispatch,getState)=>{
        if (type == "extended"){
            const currentSearch = getAdvancedQuery(getState);
            dispatch(updateCurrentSearch(currentSearch));
            dispatch(getProjects());
        }
        if (type == "fast"){
            const searchString = getState().HomeSearchReducer.searchString;
            dispatch(updateCurrentSearch({
                string:searchString
            }));
            dispatch(getProjects())
        }
    }
}

function defaultEquals(o1,o2){
    return o1.text == o2.text;
}

function receiverCommonMiddleware(data, equals = defaultEquals){
    if (data.selected){
        data.values.push(data.selected);
        data.tips = data.tips.filter(elem=>!equals(elem,data.selected));
        delete data.selected;
    }
    if (data.toDelete){
        data.values = data.values.filter(elem=>!equals(elem,data.toDelete))
        delete data.toDelete;
    }
}


//Update actions////////////////////////////////
export function updateDate(date){
    return {
        type:"SEARCH_UPDATE_DATE",
        date
    }
}

export function updateSearchString(searchString){
    return {
        type:"SEARCH_UPDATE_STRING",
        searchString
    }
}
export function updateTechnologies(technologies){
    return {
        type:"SEARCH_UPDATE_TECHNOLOGIES",
        technologies
    }
}


export function updateUsers(users){
    return {
        type:"SEARCH_UPDATE_USERS",
        users
    }
}

export function updateTags(tags){
    return {
        type:"SEARCH_UPDATE_TAGS",
        tags
    }
}
//////////////////////////////////////////////////////////////
export function selectedTabChanged(tab){
    return {
        type:"SEARCH_SELECTED_TAB_CHANGED",
        tab
    }
}

export function handleSearchDismiss(){
    return {
        type: "SEARCH_DISMISS"
    }
}

export function handleSearchShow(){
    return {
        type:"SEARCH_SHOW"
    }
}

//Receiver actions//////////////////////////////


export function receiverDate(dates){
    return dispatch=>{
        receiverCommonMiddleware(dates,(d1,d2)=>{
            return d1.upper.getTime() == d2.upper.getTime() &&
                    d1.lower.getTime() == d2.lower.getTime()
        });
        dispatch(updateDate(dates))
    }
}




function getUserTips(custom, dispatch, getState) {
    let users = getState().HomeSearchReducer.users;
    users.tips = [{text:custom+"1"},{text:custom+"2"}]
    dispatch(updateUsers(users))
}




export function receiverUsers(users){
    return (dispatch, getState)=>{
        receiverCommonMiddleware(users);
        if (users.customUpdated){
            getUserTips(users.custom, dispatch, getState)
            users.customUpdated = false;
        }
        dispatch(updateUsers(users))
    }
}




function getTechnologieTips(custom, dispatch, getState) {
    let technologies = getState().HomeSearchReducer.technologies;
    technologies.tips = [{text:custom+"1"},{text:custom+"2"}];
    dispatch(updateTechnologies(technologies))
}



export function receiverTechnologies(technologies){
    return (dispatch, getState)=>{
        receiverCommonMiddleware(technologies);
        if (technologies.customUpdated){
            getTechnologieTips(technologies.custom, dispatch, getState)
            technologies.customUpdated = false;
        }
        dispatch(updateTechnologies(technologies))
    }
}


function getTagsTips(custom, dispatch, getState) {
    let tags = getState().HomeSearchReducer.tags;
    tags.tips = [{text:custom+"1"},{text:custom+"2"}];
    dispatch(updateTags(tags))
}


export function receiverTags(tags){
    return (dispatch, getState)=>{
        receiverCommonMiddleware(tags);
        if (tags.customUpdated){
            getTagsTips(tags.custom, dispatch, getState)
            tags.customUpdated = false
        }
        dispatch(updateTags(tags))
    }
}