
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    name: String,
    description: String //? we haven`t use this field
    //features: {type: Schema.Types.ObjectId, ref:"Feature"}
});
module.exports = mongoose.model('Section', sectionSchema);