
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var sectionSchema = new Schema({
    //ObjectId will be generated automatically
    name: String,
    description: String
});
module.exports = mongoose.model('Section', sectionSchema);