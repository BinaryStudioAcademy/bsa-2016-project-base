const User = require('./userSchema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var Project = new Schema({

    users: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],

    owners: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],

    technologies: [{type: Schema.Types.ObjectId, ref: 'Technologies', required: true}],

    projectName: {type: String, required: true},

    location: {
        Latitude: String,
        Longitude: String
    },

    isCompleted: {type: Boolean, required: true},

    description: {
        date: {type: Date, default: Date.now},
        descrText: String,
        descrFullText: String
    },

    // screenShots: [{
    //     internal: Boolean,
    //     linkToExternalShot: String,
    //     internalShot: Buffer
    // }],

    screenShots: [String],

    attachments: [{
            name: String,
            date: {type: Date, default: Date.now},
            link: String
    }]

    timeBegin:{type: Date, default: Date.now, required: true},

    timeEnd: Date,

    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
        
    stage: {type: Schema.Types.ObjectId, ref: 'Stage'},

    condition: {type: Schema.Types.ObjectId, ref: 'Condition'},

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

    features: [{type: Schema.Types.ObjectId, ref: 'Feature'}]
});

// let ProjectScehma = mongoose.model('Project', Project);
// ProjectScehma.populate('owners');

module.exports = mongoose.model('Project', Project);
// module.exports = ProjectScehma;