var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

function UsersRightsRepository() {
	Repository.prototype.constructor.call(this);
	this.model =  Project;
}

UsersRightsRepository.prototype = new Repository();

UsersRightsRepository.prototype.getUsersToProject = function(data,callback){
	if(typeof data == 'string') data = {projectId : data};
	var query = this.model.findOne({ _id: data['projectId'] }),
		isOwner = (!data['usersRight'] || data['usersRight'] == 'owners'),
		isSimple = (!data['usersRight'] || data['usersRight'] == 'simples'),
		populate = {};

	if(data['filterName']){
		data['filterName'] = {
			'$regex' : data['filterName'],
			'$options' : 'i'
		};
		populate['match'] = {
			$or: [
				{ userName: data['filterName'] },
				{ userSurname: data['filterName'] }
			]
		}
	}
	
	if(isOwner) {
		populate['path'] = 'owners';
		query = query.populate(populate);
	}

	if(isSimple){
		populate['path'] = 'users';
		query = query.populate(populate);
	}

	query.exec(function(err,result){
		if(result) result = {
			projectId: result['_id'],
			users:{
				owners: ((isOwner) ? result['owners'] :  []),
				simples:((isSimple) ? result['users'] :  [])
			}
		}
		callback(err,result);
	});
}

UsersRightsRepository.prototype.updateUsersToProject = function(id,data,callback){
	var update = {};
	switch(data['usersRight']){
		case 'owners':
			update['$pop'] ={ owners:{ $each: data['simples'] }};
			update['$push'] = { users:{ $each: data['simples'] }}
		break;
		case 'simples':
			update['$pop'] ={ users:{ $each: data['owners'] }};
			update['$push'] ={ owners:{ $each: data['owners'] }};
		break;
		default:
			update['$set'] = {
				owners: data['owners'],
				users: data['simples']
			}
		break;
	}
	console.log(update);
	this.model.update({_id: id},update,callback);
}

UsersRightsRepository.prototype.getProjectList = function(callback){
	this.model.find(function(err, data) {
		if(data) for(var i in data) data[i] = {
			id: data[i]._id,
			projectName: data[i].projectName
		};
		callback(err,data);
	});
}

module.exports = new UsersRightsRepository();
