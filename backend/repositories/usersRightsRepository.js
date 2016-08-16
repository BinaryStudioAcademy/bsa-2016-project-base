var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

function UsersRightsRepository() {
	Repository.prototype.constructor.call(this);
	this.model =  Project;
}

UsersRightsRepository.prototype = new Repository();
UsersRightsRepository.prototype.getUsersToProjectByFilter = function(data,callback){
	console.log(data);
	var model = this.model;
		query = model.findOne({_id:data['projectId']}),
		isOwner = (!data['user'] || data['user'] == 'owners'),
		isSimple = (!data['user'] || data['user'] == 'simples'),
		$in = [],path = [], populate = {};

	if(data['userName']) $in.push({
		'$regex' : data['userName'],
		'$options' : 'i'
	});
    if(data['userSurname']) $in.push({
		'$regex' : data['userSurname'],
		'$options' : 'i'
	});		
	if(isOwner) path.push('owners');
	if(isSimple) path.push('simples');

	populate['path'] = path;
	if($in.length) populate['match'] = { $in };
	query = query.populate(populate);
	/* if(isSimple) query = query.populate({
		path:'users',
		match: match
	});*/
	query.exec(function(err,result){
		if(result){
			var res = { id: result['_id']}
			if(isOwner)  res['owners'] = result['owners'];
			if(isSimple) res['simples'] = result['users'];
		}
		callback(err,res);
	});
}
UsersRightsRepository.prototype.getByIdWithStakeholders = function(id,callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate(['users','owners']);
	query.exec(function(err,data){
		if(data) data = {
			id: data['_id'],
			owners: data['owners'],
			simples: data['users']
		}
		callback(err,data);
	});
}

UsersRightsRepository.prototype.getProjectList = function(callback){
		model.find(function(err, data) {
			if(data) for(var i in data) data[i] = {
				 id: data[i]._id,
				 projectName: data[i].projectName
			};
			callback(err,data);
		});
}
module.exports = new UsersRightsRepository();
