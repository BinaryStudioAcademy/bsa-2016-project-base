import * as types from '../../actions/admin/UpsertProjectActionTypes';


export default function EditProjectReducer(state=initialState, action) {
    switch (action.type) {
        case types.UP_GET_DATA_SUCCESS: {
            const {users, tags, technologies, conditions } = action.data;
            return Object.assign({}, state, {
                predefinedUsers: users,
                predefinedTags: tags,
                predefinedTechnologies: technologies,
                predefinedConditions: conditions
            });
        }
        case types.UP_ADD_USER_TO_PROJECT: {
            const {_id} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: addUserToProject(predefinedUsers, _id)
            });
        }
        case types.UP_REMOVE_USER_FROM_PROJECT: {
            const {_id} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: removeUserFromProject(predefinedUsers, _id)
            });
        }
        case types.UP_CHANGE_OWNERSHIP: {
            const {_id, checked} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: changeOwnership(predefinedUsers, _id, checked)
            });
        }
        case types.UP_CHANGE_PROJECT_NAME: {
            const {name} = action;
            return Object.assign({}, state, {

                projectName: name

            });
        }
        case types.UP_CHANGE_PROJECT_LINK: {
            const {link} = action;
            return Object.assign({}, state, {

                projectLink: link

            });
        }
        case types.UP_CHANGE_START_DATE: {
            const {date} = action;
            return Object.assign({}, state, {

                timeBegin: date

            });
        }
        case types.UP_CHANGE_FINISH_DATE: {
            const {date} = action;
            return Object.assign({}, state, {

                timeEnd: date


            });
        }
        case types.UP_CHANGE_CONDITION: {
            const {option} = action;
            return Object.assign({}, state, {

                condition: option

            });
        }
        case types.UP_CHANGE_DESCRIPTION: {
            const {text} = action;
            return Object.assign({}, state, {

                description:{
                    descrFullText:text
                }

            });
        }
        case types.UP_ADD_TAG_TO_PROJECT: {
            const {_id} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: addTagToProject(predefinedTags, _id)
            });
        }
        case types.UP_REMOVE_TAG_FROM_PROJECT: {
            const {_id} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: removeTagFromProject(predefinedTags, _id)
            });
        }
        case types.UP_POST_PROJECT_SUCCESS: {
            const {data} = action;
            const {added} = state;
            return Object.assign({}, state, {
                added: true
            });
        }
        case types.UP_POST_TAG_SUCCESS: {
            const {data} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: addNewTag(predefinedTags, data)
            });
        }
        case types.UP_POST_TECH_SUCCESS: {
            const {data} = action;
            const {predefinedTechnologies} = state;
            console.log('POST_TECH',data);
            return Object.assign({}, state, {
                predefinedTechnologies: addNewTech(predefinedTechnologies, data)
            });
        }
        case types.UP_POST_SECTION_SUCCESS: {
            const {data} = action;
            const {sections} = state;
            console.log('POST_SECTION_SUCCESS',data);
            return Object.assign({}, state, {
                sections: sections.concat(data)
            });
        }
        case types.UP_POST_FEATURE_SUCCESS: {
            const {data} = action;
            const {features} = state;
            console.log('POST_FEATURE_SUCCESS',data);
            return Object.assign({}, state, {
                features: features.concat(data)
            });
        }

        case types.UP_SELECT_SECTION: {
            const {_id} = action;
            const {sections, activeSection} = state;
            return Object.assign({}, state, {
                activeSection: selectSection(sections, _id)
            });
        }

        case types.UP_UPLOAD_FILE_SUCCESS: {
            const {path,thumb} = action.data;
            const {files} = state;
            return Object.assign({}, state, {
                files: files.concat({
                    url: path,
                    thumb: thumb,
                    name: path.slice(path.lastIndexOf('/')+1,path.length)
                })
            });
        }
        case types.UP_REMOVE_FILE: {
            const {name} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: removeFile(files, name)
            });
        }
        case types.UP_REMOVE_NEW_TAG_FROM_PROJECT: {
            const {tagName} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeNewTagFromProject(tags, tagName)
            });
        }
        case types.UP_ADD_TECH_TO_PROJECT: {
            const {_id} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: addTechToProject(predefinedTechnologies, _id)
            });
        }
        case types.UP_REMOVE_TECH_FROM_PROJECT: {
            const {_id} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: removeTechFromProject(predefinedTechnologies, _id)
            });
        }
        case 'INITIAL_STATE_FROM_DB': {
            const {project} = action;
            return Object.assign({}, state, {
                projectId: project._id,
                projectName: project.projectName,
                projectLink: project.projectLink,
                timeBegin: project.timeBegin,
                timeEnd: project.timeEnd,
                condition: project.status,
                users: project.users,
                owners: project.owners,
                tags: project.tags,
                technologies: project.technologies,
                conditions: project.conditions,
                features: project.features,
                files: project.attachments,
                initialTags: false,
                initialTechnologies: false,
                initialUsers: false,
                description:{
                    descrFullText: project.description.descrFullText
                }});
        }
        case 'CLEAN_STORE': {
            return Object.assign({}, state, {
                projectId: null,
                projectName:'',
                projectLink:'',
                timeBegin:'',
                timeEnd:'',
                condition:'',
                users: null,
                owners: null,
                tags: null,
                technologies: null,
                conditions: [],
                sections: [],
                features: [],
                files: [],
                activeSection: {},
                tagExists: false,
                added: false,
                initialTags: false,
                initialTechnologies: false,
                initialUsers: false,
                description:{
                    descrFullText: 'Description'
                },
                predefinedUsers: [],
                predefinedTags: [],
                predefinedTechnologies: [],
                predefinedConditions: []
            })
        }
        case 'INITIAL_STATE_TAGS': {
            const {predefinedTags} = action;
            return Object.assign({}, state, {predefinedTags: predefinedTags}, {initialTags: true})
        }
        case 'INITIAL_STATE_TECHNOLOGIES': {
            const {predefinedTechnologies} = action;
            return Object.assign({}, state, {predefinedTechnologies: predefinedTechnologies}, {initialTechnologies: true})
        }
        case 'INITIAL_STATE_USERS': {
            const {predefinedUsers} = action;
            return Object.assign({}, state, {predefinedUsers: predefinedUsers}, {initialUsers: true})
        }
        default: {
            return state;
        }
    }
};



const selectSection = (sections, _id) => {
    for(let i = 0; i < sections.length; i++) {
        if (sections[i]._id === _id) {
            return sections[i];
        }
    }
    console.log('selectSection');
    return null;
}

const removeFile = (files, name) => {
    files.forEach( (file, index) => {
        if (file.name === name) {
            files.splice(index, 1);
        }
    });
    return [].concat(files);
}

const addNewTech  = (technologies, tech) => {
    tech.inProject = true;
    technologies.push(tech);
    return [].concat(technologies);
}

const addTechToProject = (techs, _id) => {
    techs.forEach( item => {
        if (item._id === _id) {
            item.inProject = true;
        }
    });
    console.log('addTechToProject 22');
    return [].concat(techs);
}

const removeTechFromProject = (techs, _id) => {
    techs.forEach( item => {
        if (item._id === _id) {
            item.inProject = false;
        }
    });
    return [].concat(techs);
}


const addNewTag  = (predefinedTags, tag) => {
    tag.inProject = true;
    predefinedTags.push(tag);
    return [].concat(predefinedTags);
}

const addTagToProject = (predefinedTags, _id) => {
    predefinedTags.forEach( tag => {
        if (tag._id === _id) {
            tag.inProject = true;
        }
    });
    return [].concat(predefinedTags);
}

const removeTagFromProject = (predefinedTags, _id) => {
    predefinedTags.forEach( tag => {
        if (tag._id === _id) {
            tag.inProject = false;
        }
    });
    return [].concat(predefinedTags);
}

const addUserToProject = (users, _id) => {
    users.forEach( user => {
        if (user._id === _id) {
            user.inProject = true;
        }
    });
    return [].concat(users);
}

const removeUserFromProject = (users, _id) => {
    users.forEach( user => {
        if (user._id === _id) {
            user.inProject = false;
            user.owner = false;
        }
    });
    return [].concat(users);
}

const changeOwnership = (users, _id, value) => {
    users.forEach( user => {
        if (user._id === _id) {
            user.owner = value;
        }
    });
    return [].concat(users);
}





const feature = {
    _id : "57a2631ab42bbf5a2daa9997",
    featureName : "5184",
    section : "57b9c2e4acd14b1840a00c5c",
    featureOrder : "Necesary",
    isNecessary : false,
    created : "24/04/2015",
    isImplemented : false,
    childFeatures : "57a237d2fc13ae319e002654",
    isItSubFeature : false,
    descriptionText : "Description Sample Text",
    descriptionHTMLText : "Description HTML Sample Text"
}



const initialState = {
    projectId: null,
    projectName:'',
    projectLink:'',
    timeBegin:'',
    timeEnd:'',
    condition:'',
    users: null,
    owners: null,
    tags: null,
    technologies: null,
    conditions: [],
    sections: [],
    features: [],
    files: [],
    activeSection: {},
    tagExists: false,
    added: false,
    initialTags: false,
    initialTechnologies: false,
    initialUsers: false,
    description:{
        descrFullText: 'Description'
    },
    predefinedUsers: [],
    predefinedTags: [],
    predefinedTechnologies: [],
    predefinedConditions: []

};


