// var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;

// var StageSchema = new Schema({			
   
//     stageName: String,
//     commisioned: {type: Date, required: true},
//     decomissioned: Date
// })
// module.exports = mongoose.model('Stage', StageSchema);



var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StageSchema = new Schema({			
   
    StageName: String,
    commissioned: {type: Date, required: true},
    decommissioned: Date
})
module.exports = mongoose.model('Stage', StageSchema);