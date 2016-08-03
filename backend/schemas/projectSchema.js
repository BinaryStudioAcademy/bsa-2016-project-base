var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    users: {
        users:[{							            // Related to ‘UsersCollection’
            userNameLink: ObjectId                      //Schema.UsersCollection._id
        }],
        required: true
    },
    owners: {
        users:[{							            // Related to ‘UsersCollection’
            userNameLink: ObjectId                      //Schema.UsersCollection._id
        }],
        required: true
    },

    technologies: [{					               // Related to ‘TechnologiesCollection’
        techNameLink: ObjectId                          //Schema.TechnologiesCollection._id,
        required: true
    }],

    projectName: {type: String, required: true},			// Unique

    isCompleted: Boolean,								//020816 Updated

    description: [{										//020816 Updated
        date: {type: Date, default: Date.now},
		descrText: String,
		attachments: [{
			name: String,
			date: {type: Date, default: Date.now},
			att: Buffer
		}]
    }],

    screenShots: [{
        internal: Boolean,							//Internal: true, External: false
        linkToSource: String,						// if ‘internal’ == false
        shot: Buffer
    }],

    timeBegin:{
        type: Date,
        default: Date.now,
        required: true
    },
    timeEnd:{
        type: Date,
        required: true
    },

    tags: [{											// Related to ‘TagsCollection’
        tagNameLink: ObjectId                           //Schema.TagsCollection._id,  // if ‘fromCollection’ is ‘true’
        tagName: String
    }],

    stage: {											// Related to ‘StagesCollection’
        stageNameLink: ObjectId                         //Schema.StagesCollection._id
    },

    condition: {						              // Related to ‘ConditionCollection’
        name: String,					              // InProgress, Estimated
        conditionNameLink: ObjectId                   //Schema.ConditionCollection._id,
        required: true
    },

    questions:[{
        question:{
            author: ObjectId                           //Schema.UserCollection._id,	 //020816 Updated
            text: String
        },
        answer: [{
        	author: ObjectId                           //Schema.UserCollection._id,	 //020816 Updated
        	text: String
        }],
        isPrivate: Boolean
    }]

    rating: [{
        value: Number,
        date: {type: Date, default: Date.now},
        description: String
    }],

    features: [ObjectId]                            //[Schema.FeatureCollection._id]	//020816 Edited as prosition
});

module.exports = mongoose.model('Project', Project);