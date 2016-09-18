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
	var query = this.model.findOne({ _id: data['projectId'] });
	var population = {};

	if(data['filterName']){
		population['match'] = {
			'$regex' : data['filterName'],
			'$options' : 'i'
		};
		population['match'] = {
			$or: [{ 
				userName: population['match']
			},{ 
				userSurname: population['match']
			}]
		}
	}
	
	if(data['usersRight'] != "simples"){
		population['path'] = 'owners';
		query = query.populate(population);
	}

	if(data['usersRight'] != "owners"){
		population['path'] = 'users';
		query = query.populate(population);
	}

	query.exec(function(err,result){
		if(result) result = {
			projectId: result['_id'],
			users:{
				owners: ((data['usersRight'] != "simples") ? result['owners'] :  []),
				simples:((data['usersRight'] != "owners") ? result['users'] :  [])
			}
		}
		callback(err,result);
	});
}

UsersRightsRepository.prototype.updateUsersToProject = function(id,data,callback){
	var updation;
	switch(data['usersRight']){
		case 'owners':
			var filter =  { $each: data['simples'] };
			updation = {
				$pop: { owners: filter  },
				$push: { users: filter  }
			};
		break;
		case 'simples':
			var  filter =  { $each: data['owners'] };
			updation = {
				$pop: { owners: filter },
				$push: { users: filter }
			};
		break;
		default:
			updation = {
				$pop:{
					owners: { $each: data['simples'] },
					users: { $each: data['owners'] }
				},$push: {
					owners: { $each: data['owners'] },
					users: { $each: data['simples'] }
				}
			};
		break;
	}
	this.model.update({_id: id},updation,callback);
}

UsersRightsRepository.prototype.getProjectList = function(callback){
	this.model.find(function(err, data) {
		if(!err) for(let i in data) data[i] = {
			id: data[i]._id,
			projectName: data[i].projectName
		};
		callback(err,data);
	});
}

module.exports = new UsersRightsRepository();
