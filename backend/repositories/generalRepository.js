var Repository = function(){

};

Repository.prototype.add = function(data, callback){
	var model = this.model;
	var newitem = new model(data);
	newitem.save(callback);
};

Repository.prototype.getAllDataMainPage = function(callback){
	var model = this.model;
	var query = model.find().populate('technologies');
	query.exec(callback);
};

Repository.prototype.getAllDataMainPageOrderBy = function(orderBy, callback){
	var model = this.model;
	var order = {};
	switch (orderBy) {
		case 'completed':
			order['isCompleted'] = -1;
			break;
		case 'oldest':
			order['timeBegin'] = -1;
			break;
		case 'newest':
			order['timeBegin'] = 1;
			break;
		default:
			order['timeBegin'] = 1;
	}

	var query = model.find().populate('technologies').sort(order);
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
	var query = model.findOne({_id:id});
	query.exec(callback);
};

Repository.prototype.getByIdFeatures = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate('features');
	query.exec(callback);
};

Repository.prototype.getDetails = function(arrOfId, callback){
	var model = this.model;
	var query = model.find({_id: {$in: arrOfId}});
	query.exec(callback);
};

module.exports = Repository; 