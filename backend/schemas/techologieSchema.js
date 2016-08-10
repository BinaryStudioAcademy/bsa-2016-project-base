var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Technologies = new Schema({
	techName: String,
	techAvatar: Buffer,
	techDescription: String,
	techVersion: String
});

module.exports = mongoose.model('Technologies', Technologies);