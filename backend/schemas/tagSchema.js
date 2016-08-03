var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
	tagName: String
});

module.exports = mongoose.model('Tag', tagSchema); 