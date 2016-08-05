var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StageSchema = new Schema({
	stageName: String,
  commisioned: {type: Date},
  decommisioned: {type: Date}
})
module.exports = mongoose.model('Stage', StageSchema);
