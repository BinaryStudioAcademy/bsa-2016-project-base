var mongoose = require('mongoose');
var Schema = mongoose.Schema;

	var Technology = new Schema({
		techName: String,
		techAvatar: String,
		techDescription: String
	});

module.exports = mongoose.model('Technology',Technology);