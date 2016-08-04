var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StageSchema = new Schema({	

//неправильно, но отдаёт корректные данные	
   
    stageName: String,
    commisioned: {type: Date, required: true},
    decomissioned: Date

//правильно, но отдаёт некорректные данные	
		// stageName: String,
  //   commissioned: {type: Date, required: true},
  //   decommissioned: Date

})
module.exports = mongoose.model('Stage', StageSchema);
