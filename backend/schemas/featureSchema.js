var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var featureSchema = new Schema({
	featureName: String,
	section: {type: Schema.Types.ObjectId, ref: 'Section'},
	featureOrder: String,
	isNecessary: Boolean,
	featureDescription: {
		images: [{shortName: String, binBody: Buffer}],
		extImagesLinks: [String],
		attachments: [{fileName: String, binBody: Buffer}],
		extLinks: [String],
		lists: [[String]]
	},
	created: Date,
	isImplemented: Boolean,
	childFeatures: [{type: Schema.Types.ObjectId, ref: 'Feature'}],	
	isItSubFeature: Boolean
});

module.exports = mongoose.model('Feature',featureSchema);
