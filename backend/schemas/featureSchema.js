var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feature = new Schema({
	featureName: String,
	section: {type: Schema.Types.ObjectId, ref: 'Section'},
	featureOrder: String,
	isNecessary: Boolean,
	descriptionText: String,
	descriptionHTMLText:String
	created: Date,
	isImplemented: Boolean,
	childFeatures: [{type: Schema.Types.ObjectId, ref: 'Feature'}],
	isItSubFeature: Boolean
});


// var Feature = new Schema({					// Commented 17/08/2016

// 	featureName: String,

// 	section: {type: Schema.Types.ObjectId, ref: 'Section'},

// 	featureOrder: String,

// 	isNecessary: Boolean,

// 	featureDescription: {
// 		images: [{shortName: String, binBody: Buffer}],
// 		extImagesLinks: [String],
// 		attachments: [{fileName: String, binBody: Buffer}],
// 		extLinks: [String],
// 		lists: [String]										// Changed 04/08/16   [[String]]
// 	},

// 	created: Date,

// 	isImplemented: Boolean,

// 	childFeatures: [{type: Schema.Types.ObjectId, ref: 'Feature'}],

// 	isItSubFeature: Boolean
// });

// var featureSchema = new Schema({
// 	featureName: String,
// 	section: {type: Schema.Types.ObjectId, ref: 'Section'},
// 	featureOrder: String,
// 	isNecessary: Boolean,
// 	featureDescription: {
// 		images: [{shortName: String, binBody: Buffer}],
// 		extImagesLinks: [String],
// 		attachments: [{fileName: String, binBody: Buffer}],
// 		extLinks: [String],
// 		lists: [[String]]
// 	},
// 	created: Date,
// 	isImplemented: Boolean,
// 	childFeatures: [{type: Schema.Types.ObjectId, ref: 'Feature'}],	
// 	isItSubFeature: Boolean
// });

module.exports = mongoose.model('Feature', Feature);
