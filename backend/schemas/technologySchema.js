var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Technologies = new Schema({
	techName: String,
	techAvatar: String,
	techDescription: String,
	techVersion: String
});

module.exports = mongoose.model('Technologies', Technologies);