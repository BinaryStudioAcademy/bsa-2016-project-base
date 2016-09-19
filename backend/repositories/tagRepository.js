var Tag = require('../schemas/tagSchema');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Projects = require('../schemas/projectSchema');

function TagRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Tag;
}

TagRepository.prototype = new Repository();

TagRepository.prototype.deleteMany = function(array, callback){
	console.log("tagRemoving:", array);
	var model = this.model;
	array.forEach(id => {
		var query = model.remove({_id:id});
		query.exec((err, result)=>{
			Projects.update({}, {$pull: {tags: id}}, {multi: true}, (_err, _result)=>{
				if(_err) {
		          callback(_err, null);
		        } else callback(null, result);
			});
		});
	});
};

TagRepository.prototype.delete = function(id, callback){
	var model = this.model;
	var query = model.remove({_id:id});
	query.exec((err, result)=>{
		Projects.update({}, {$pull: {tags: id}}, {multi: true}, (_err, _result)=>{
			if(_err) {
	          callback(_err, null);
	        } else callback(null, result);
		});
	});
};

module.exports = new TagRepository();