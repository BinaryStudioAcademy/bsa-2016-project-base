var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

function UsersRightsRepository() {
	Repository.prototype.constructor.call(this);
	this.model =  Project;
}

UsersRightsRepository.prototype = new Repository();
UsersRightsRepository.prototype.getUsersToProjectByFilter = function(data,callback){
	var model = this.model;
		query = model.findOne({_id:data['projectId']}),
		isOwner = (!data['user'] || data['user'] == 'owners'),
		isSimple = (!data['user'] || data['user'] == 'simples')
		subcriteria = { 
			/*$or: [ 
				{ userName: '/' + data['userFilter'] + '/' },
				{ userSurname: '/' + data['userFilter'] + '/'} 
			] */
		};
	if(isOwner)  query = query.populate('owners',null,subcriteria )
	if(isSimple) query = query.populate('users',null,subcriteria );
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
module.exports = new UsersRightsRepository();