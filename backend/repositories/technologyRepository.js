var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Projects = require('../schemas/projectSchema');
var Technology = require('../schemas/technologySchema');

function TechnologyRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Technology;
}
TechnologyRepository.prototype = new Repository();

TechnologyRepository.prototype.deleteMany = function(array, callback){
	var model = this.model;
	array.forEach(id => {
		var query = model.remove({_id:id});
		query.exec((err, result)=>{
			Projects.update({}, {$pull: {technologies: id}}, {multi: true}, (_err, _result)=>{
				if(_err) {
		          callback(_err, null);
		        } else callback(null, result);
			});
		});
	});
};

TechnologyRepository.prototype.delete = function(id, callback){
	var model = this.model;
	var query = model.remove({_id:id});
	query.exec((err, result)=>{
		Projects.update({}, {$pull: {technologies: id}}, {multi: true}, (_err, _result)=>{
			if(_err) {
	          callback(_err, null);
	        } else callback(null, result);
		});
	});
};

module.exports = new TechnologyRepository();