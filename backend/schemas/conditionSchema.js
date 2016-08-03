var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConditionSchema = new Schema({			
   
    conditionName: String,
    commissioned: {type: Date, required: true, default: Date.now},
    decommissioned: Date
})
module.exports = mongoose.model('Condition', ConditionSchema);