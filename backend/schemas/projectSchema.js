var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var Project = new Schema({

    users: [ {type: Schema.Types.ObjectId, ref: 'User', required: true} ],

    owners: [ {type: Schema.Types.ObjectId, ref: 'User', required: true} ],

    technologies: [{type: Schema.Types.ObjectId, ref: 'Technologies', required: true}],

    projectName: {type: String, required: true},

    isCompleted: {type: Boolean, required: true},

    description: [{
        date: {type: Date, default: Date.now},
        descrText: String,
        attachments: [{
            name: String,
            date: {type: Date, default: Date.now},
            attach: Buffer
        }]
    }],

    screenShots: [{
        internal: Boolean,
        linkToExternalShot: String,
        internalShot: Buffer
    }],

    timeBegin:{ type: Date, default: Date.now, required: true },

    timeEnd: Date,

    tags: [ {type: Schema.Types.ObjectId, ref: 'Tag'} ],
        
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

module.exports = mongoose.model('Project', Project);