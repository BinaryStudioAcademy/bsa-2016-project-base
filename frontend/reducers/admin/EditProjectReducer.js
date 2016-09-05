import * as types from '../../actions/admin/EditProjectActionsTypes';
import fileThumbService from '../../services/FileThumbService';


export default function EditProjectReducer(state=initialState, action) {
    switch (action.type) {
        case types.UP_GET_DATA_SUCCESS_ED: {
            const {users, tags, technologies, conditions } = action.data;
            return Object.assign({}, state, {
                predefinedUsers: users,
                predefinedTags: tags,
                predefinedTechnologies: technologies,
                predefinedConditions: conditions
            });
        }
        case types.UP_ADD_USER_TO_PROJECT_ED: {
            const {_id} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: addUserToProject(predefinedUsers, _id)
            });
        }
        case types.UP_REMOVE_USER_FROM_PROJECT_ED: {
            const {_id} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: removeUserFromProject(predefinedUsers, _id)
            });
        }
        case types.UP_CHANGE_OWNERSHIP_ED: {
            const {_id, checked} = action;
            const {predefinedUsers} = state;
            return Object.assign({}, state, {
                predefinedUsers: changeOwnership(predefinedUsers, _id, checked)
            });
        }
        case types.UP_CHANGE_PROJECT_NAME_ED: {
            const {name} = action;
            return Object.assign({}, state, {

                projectName: name

            });
        }
        case types.UP_CHANGE_PROJECT_LINK_ED: {
            const {link} = action;
            return Object.assign({}, state, {

                projectLink: link

            });
        }
        case types.UP_CHANGE_START_DATE_ED: {
            const {date} = action;
            return Object.assign({}, state, {

                timeBegin: date

            });
        }
        case types.UP_CHANGE_FINISH_DATE_ED: {
            const {date} = action;
            return Object.assign({}, state, {

                timeEnd: date


            });
        }
        case types.UP_CHANGE_CONDITION_ED: {
            const {option} = action;
            return Object.assign({}, state, {

                status: option

            });
        }
        case types.UP_CHANGE_DESCRIPTION_ED: {
            const {text} = action;
            return Object.assign({}, state, {

                description:{
                    descrFullText:text
                }

            });
        }
        case types.UP_ADD_TAG_TO_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: addTagToProject(predefinedTags, _id)
            });
        }
        case types.UP_REMOVE_TAG_FROM_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: removeTagFromProject(predefinedTags, _id)
            });
        }
        case "UPDATE_PROJECT_SUCCESS": {
            const {data} = action;
            const {added} = state;
            return Object.assign({}, state, {
                added: true
            });
        }
        case types.UP_POST_TAG_SUCCESS_ED: {
            const {data} = action;
            const {predefinedTags} = state;
            return Object.assign({}, state, {
                predefinedTags: addNewTag(predefinedTags, data)
            });
        }
        case types.UP_POST_TECH_SUCCESS_ED: {
            const {data} = action;
            const {predefinedTechnologies} = state;
            console.log('POST_TECH',data);
            return Object.assign({}, state, {
                predefinedTechnologies: addNewTech(predefinedTechnologies, data)
            });
        }
        case types.UP_POST_SECTION_SUCCESS_ED: {
            const {data} = action;
            const {sections} = state;
            console.log('POST_SECTION_SUCCESS',data);
            return Object.assign({}, state, {
                sections: sections.concat(data)
            });
        }
        case types.UP_POST_FEATURE_SUCCESS_ED: {
            const {data} = action;
            const {features} = state;
            console.log('POST_FEATURE_SUCCESS',data);
            return Object.assign({}, state, {
                features: features.concat(data)
            });
        }

        case types.UP_POST_FEATURE_DELETE_ED: {
            const {data} = action;
            const {features} = state;
            console.log('DELETE_FEATURES_SUCCESS',data);
            return Object.assign({}, state, {
                features: [].concat(data)
            });
        }

        case types.UP_SELECT_SECTION_ED: {
            const {_id} = action;
            const {sections, activeSection} = state;
            return Object.assign({}, state, {
                activeSection: selectSection(sections, _id)
            });
        }

        case types.UP_UPLOAD_FILE_ED: {
            const {name} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: files.concat({
                    name,
                    good:true,
                    ready: false
                })
            });
        }

        case types.UP_UPLOAD_FILE_SUCCESS_ED: {
            const {data} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: updateFileSuccess(files, data)
            });
        }
        case types.UP_REMOVE_FILE_ED: {
            const {name} = action;
            const {files} = state;
            return Object.assign({}, state, {
                files: removeFile(files, name)
            });
        }
        case types.UP_REMOVE_NEW_TAG_FROM_PROJECT_ED: {
            const {tagName} = action;
            const {tags} = state;
            return Object.assign({}, state, {
                tags: removeNewTagFromProject(tags, tagName)
            });
        }
        case types.UP_ADD_TECH_TO_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: addTechToProject(predefinedTechnologies, _id)
            });
        }
        case types.UP_POST_PROJECT_SUCCESS_ED: {
            const {data} = action;
            const {added} = state;
            return Object.assign({}, state, {
                added: true
            });
        }
        case types.UP_REMOVE_TECH_FROM_PROJECT_ED: {
            const {_id} = action;
            const {predefinedTechnologies} = state;
            return Object.assign({}, state, {
                predefinedTechnologies: removeTechFromProject(predefinedTechnologies, _id)
            });
        }
        case 'INITIAL_STATE_FROM_DB': {
            const {project} = action;
            var data = [];
            if(project.attachments.length != 0) {
                data = project.attachments.map(function (el) {
                    return fileThumbService.setThumb(Object.assign({}, el, {path: el.link}));
                });
            }
            return Object.assign({}, state, {
                projectId: project._id,
                projectName: project.projectName,
                projectLink: project.projectLink,
                timeBegin: project.timeBegin,
                timeEnd: project.timeEnd,
                status: project.status,
                users: project.users,
                owners: project.owners,
                tags: project.tags,
                technologies: project.technologies,
                conditions: project.conditions,
                features: project.features,
                files: data.map(function(el) {
                    return Object.assign({}, el, {ready: true}, {good: true}, {inBase: true})
                }),
                initialTags: false,
                initialTechnologies: false,
                initialUsers: false,
                initialSections: false,
                initialFiles: false,
                description:{
                    descrFullText: project.description.descrFullText
                }});
        }
        case 'CLEAN_STORE_ED': {
            return Object.assign({}, state, {
                projectId: null,
                projectName:'',
                projectLink:'',
                timeBegin:'',
                timeEnd:'',
                status:'',
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
                initialSections: false,
                iconLoaded: false,
                initialFiles: false,
                techIcon: {},
                techIconError: null,
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
        case 'INITIAL_STATE_SECTIONS': {
            const {sections} = action;
            return Object.assign({}, state, {sections: sections}, {initialSections: true})
        }
        case types.UP_UPLOAD_ICON_SUCCESS_ED: {
            const {data, iconLoaded, error} = action;
            const {techIcon} = state;
            return Object.assign({}, state, {
                techIcon: data,
                iconLoaded: iconLoaded,
                techIconError: error
            });
        }
        case "INITIAL_STATE_FI": {
            const {files} = action;
            return Object.assign({}, state, {files: files}, {initialFiles: true});
        }
        default: {
            return state;
        }
    }
};

const updateFileSuccess = (files, data) => {
    if (!data.hasOwnProperty('error')) {
        files.forEach( file => {
            const {name, path, thumb} = data;
            if (!file.ready && file.name === name) {
                file.path = path;
                file.thumb = thumb;
                file.ready = true;
            }
        });
    } else {
        files.forEach( file => {
            const {name, error} = data;
            console.log('updateFileFailure ');
            if (!file.ready && file.name === name) {
                file.ready = true;
                file.good = false;
                file.error = error;
            }
        });

    }
    return [].concat(files);
}



const updateFileFailure = (files, error) => {
    console.log('updateFileFailure ',error.name);
    const {message, name} = error;
    files.forEach( file => {
        if (!file.ready && file.name === name) {

            file.ready = true;
            file.good = false;
        }
    });

    return [].concat(files);
}



const selectSection = (sections, _id) => {
    for(let i = 0; i < sections.length; i++) {
        if (sections[i]._id === _id) {
            return sections[i];
        }
    }
    console.log('selectSection');
    return null;
};

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

const addUserToProject = (predefinedUsers, _id) => {
    predefinedUsers.forEach( user => {
        if (user._id === _id) {
            user.inProject = true;
        }
    });
    return [].concat(predefinedUsers);
}

const removeUserFromProject = (predefinedUsers, _id) => {
    predefinedUsers.forEach( user => {
        if (user._id === _id) {
            user.inProject = false;
            user.owner = false;
        }
    });
    return [].concat(predefinedUsers);
}

const changeOwnership = (predefinedUsers, _id, value) => {
    predefinedUsers.forEach( user => {
        if (user._id === _id) {
            user.owner = value;
        }
    });
    return [].concat(predefinedUsers);
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
    status:'',
    owners: null,
    tags: null,
    technologies: null,
    conditions: [],
    sections: [],
    features: [],
    files: [],
    filesS: [],
    activeSection: {},
    tagExists: false,
    added: false,
    initialTags: false,
    initialTechnologies: false,
    initialUsers: false,
    initialSections: false,
    initialFiles: false,
    iconLoaded: false,
    techIcon: {},
    techIconError: null,
    description:{
        descrFullText: 'Description'
    },
    predefinedUsers: [],
    predefinedTags: [],
    predefinedTechnologies: [],
    predefinedConditions: []

};


