var Repository = function(){

};

Repository.prototype.add = function(data, callback){
	var model = this.model;
	var newitem = new model(data);
	console.log('Repository.prototype.add: ', data);
	newitem.save(callback);
};

Repository.prototype.getAllDataMainPage = function(callback){
	var model = this.model;
	var query = model.find().populate('technologies');
	query.exec(callback);
};

Repository.prototype.update = function(id, body, callback){
	var query = this.model.update({_id:id}, body);
	query.exec(callback);
};

Repository.prototype.delete = function(id, callback){
	var model = this.model;
	var query = model.remove({_id:id});
	query.exec(callback);
};

Repository.prototype.deleteMany = function(array, callback){
	var model = this.model;
	array.forEach(id => {
		var query = model.remove({_id:id});
		query.exec(callback);
	});
};

Repository.prototype.getAll = function(callback){
	var model = this.model;
	var query = model.find();
	query.exec(callback);
};

Repository.prototype.getById = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate('features');
	query.exec(callback);
};

Repository.prototype.getByIdWithStakeholders = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id})
//				.populate('stage')
//				.populate('condition')
				.populate('users')
				.populate('owners');
	query.exec(callback);
};

Repository.prototype.getDetails = function(arrOfId, callback){
	var model = this.model;
	var query = model.find({_id: {$in: arrOfId}});
	query.exec(callback);
};

module.exports = Repository; 