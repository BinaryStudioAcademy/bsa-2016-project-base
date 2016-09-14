const User = require('./userSchema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var Project = new Schema({

    users: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],

    owners: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],

    technologies: [{type: Schema.Types.ObjectId, ref: 'Technologies', required: true}],

    projectName: {type: String, required: 'This field is required'},

    linkToProject: String,

    location: {
        Latitude: String,
        Longitude: String
    },

    description: {
        date: {type: Date, default: Date.now},
        descrText: String,
        descrFullText: String
    },

    screenShots: [String],

    attachments: [{
            name: String,
            date: {type: Date, default: Date.now},
            link: String
    }],

    timeBegin:{type: Date, default: Date.now, required: 'This field is required'},

    timeEnd: Date,

    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    
    status: {type: String, enum: ['Estimation', 'InProgress', 'Completed']},

    questions:[{
        question:{
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            text: String
        },
        answers: [{
         author: {type: Schema.Types.ObjectId, ref: 'User'},
         text: String
        }],
        isPrivate: Boolean
    }],

    rating: [{
        value: Number,
        date: {type: Date, default: Date.now},
        description: String
    }],

    features: [{type: Schema.Types.ObjectId, ref: 'Feature'}],

    contacts: {
        countryCode: String,
        countryName: String,
        contactPerson: String,
        city: String,
        phone: String,
        email: String,
        skype: String
    }
});


// Custom validators for checking array-fields are empty or not
Project.path('users').validate(function(users){
    if(users.length === 0){return false}
    return true;
}, 'You must add user and owner');

Project.path('owners').validate(function(owners){
    if(owners.length === 0){return false}
    return true;
}, 'You must add user and owner');

Project.path('technologies').validate(function(technologies){
    if(technologies.length === 0){return false}
    return true;
}, 'You must add a technology');

Project.path("timeBegin").validate(function(begin){
    return !this.timeEnd || this.timeEnd.getTime() > begin.getTime()
}, "Start date must be lower then end");

Project.path("projectName").validate(function(value){
    return value.length < 40
}, "Project name must be shorter then 40 symbols");

module.exports = mongoose.model('Project', Project);
