var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

function ProjectRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Project;
}

ProjectRepository.prototype = new Repository();

ProjectRepository.prototype.getByIdWithStakeholders = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate(["owners","users"]);
	query.exec(callback);
};

ProjectRepository.prototype.getByAllData = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id})
		.populate(["tags","technologies","owners","users"])
		.populate({
			path: "features",
			populate: { path: "section" }
		});
	query.exec(callback);
};


ProjectRepository.prototype.getByIdWithTags = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate('tags');
	query.exec(callback);
};

ProjectRepository.prototype.getByIdWithTechnologies = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate('technologies');
	query.exec(callback);
};

Repository.prototype.getByIdWithFeatures = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}).populate('features');
	query.exec(callback);
};

Repository.prototype.getAllDataMainPage = function(callback){
	var model = this.model;
	var query = model.find().populate(['technologies', 'tags', 'users','owners']);
	query.exec(callback);
};

ProjectRepository.prototype.getAll = function(callback){
    var model = this.model;
    var query = model.find().populate(['owners', 'users']);
    query.exec(callback);
};

ProjectRepository.prototype.getAllInProgress = function(callback){
	var model = this.model;
	var query = model.find({
		status: {$not: { $eq: 'Completed' }}, 
		features: {$not: {$size: 0}}
	}, {
		_id: 1, 
		projectName: 1, 
		description: 1
	});
	query.exec(callback);
};

ProjectRepository.prototype.getAllByFilters = function(filters,callback){
	var model = this.model,population = {
			users: {},
			features:{
				path: 'features',
   				populate: { path: 'section' }
			}
		}, query = model.findOne({_id:filters['projectId']})
			.populate(['technologies', 'tags'])
			.populate(['questions.question.author','questions.answers.author']);

  	if(filters['userName']){

		filters['userName'] = {
			'$regex' : filters['userName'],
			'$options' : 'i'
		};

		population.users['match'] = {
			$or: [{ 
					userName: filters['userName'] 
				},{ 
					userSurname: filters['userName'] 	
			}]
		}
	}

	if(filters['userRight'] != "users") {
		population.users['path'] = "owners";
		query = query.populate(population['users']);
	}

	if(filters['userRight'] != "owners") {
		population.users['path'] = "users";
		query = query.populate(population['users']);
	}

	if(filters['featuresIds']) 
		population.features['match'] = {
			_id:{ 
				$in: filters['featuresIds']
			}
		}

	query.populate(population['features']);
	query.exec((err, result)=>{
		if(!err){
			switch(filters['userRight']){
				case 'users':
					result['owners'] = null;
					break;
				case 'owners':
					result['userss'] = null;
					break;
			}
		}
		callback(err, result);
	});
};

ProjectRepository.prototype.getAllwithLocations = function(callback){
    var model = this.model;
    var query = model.find({},{
    		features: 0, 
    		questions: 0, 
    		screenShots: 0,
    		attachments: 0, 
    		users: 0,
    		owners: 0, 
    		tags: 0, 
    		technologies: 0, 
    		description: 0, 
    		rating: 0, 
    		status: 0, 
    		timeBegin: 0, 
    		timeEnd: 0
    });

    query.exec((err, result)=>{
    	if (err) console.log('Get all locations Error');
        let projLocations = [];
        result.forEach((elem, ind, arr)=>{
        	projLocations.push({
        		label: ((elem.projectName.length > 21) ? 
        			elem['projectName'].substr(0, 21).concat('...'): 
        			elem['projectName']),
        		projId: elem._id,
        		location: elem.location
        	});
        });
        callback(null, projLocations);
    });
};

ProjectRepository.prototype.getByIdForLocations = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id}, { 
		features: 0, 
		questions: 0, 
		screenShots: 0, 
		attachments: 0, 
		users: 0, 
		owners: 0, 
		tags: 0, 
		technologies: 0
	});
	query.exec(callback);
};

ProjectRepository.prototype.setRateInfo = function(id,body,callback){
	var index = body.value - 1;
	var str = `rating.rateDistribution.${index}`;
	var model = this.model;
	var query = model.update({_id: id},{
		$push: { 'rating.rateInfo' : body },
		$inc : { [str] : 1 }
	});
	query.exec(callback);
};

ProjectRepository.prototype.getRateAll = function(id,callback){
	var model = this.model;
	var query = model.find({_id: id},{
		'rating' : 1
	});
	query.exec(callback);
};

ProjectRepository.prototype.addQ = function(id,body,callback){
	var model = this.model;
	var query = model.update({_id: id},{
		$push: { questions: body }
	});
	query.exec(callback);
};

ProjectRepository.prototype.addA = function(id,qId,body,callback){
	var model = this.model;
	var query = model.update({
		_id:id,
		'questions._id':qId
	}, {
		$push: { 'questions.$.answers': body }
	});
	query.exec(callback);
};

ProjectRepository.prototype.editQ = function(id,qId,body,callback){
	var model = this.model;
	var query = model.update({
		_id: id,
		'questions._id': qId
	},{
		$set:{
			'questions.$.isPrivate': body.isChecked,
			'questions.$.question.text': body.message
		}
	});
	query.exec(callback);
};

ProjectRepository.prototype.editA = function(id,qId,aId,body,callback){
	var model = this.model;
	var str = `questions.$.answers.${body.numA}.text`;
	var query = model.update({
		_id: id,
		'questions._id':qId,
		'questions.answers._id':aId
	},{
		$set: { [str] : body.message }
	});
	query.exec(callback);
};

ProjectRepository.prototype.removeQ = function(id,qId,callback){
	var model = this.model;
	var query = model.update({_id: id},{
	 	$pull: { questions: { _id:qId } } }
	);
	query.exec(callback);
};

ProjectRepository.prototype.removeA = function(id,qId,aId,callback){
	var model = this.model;
	var query = model.update({
		_id: id,
		'questions._id': qId
	},{
		$pull: {
			'questions.$.answers': { _id:aId}
		}
	});
	query.exec(callback);
};
ProjectRepository.prototype.getDataForDelete = function(id, callback) {
	var model = this.model;
	var query = model.findOne({_id: id})
		.populate({
			path: "features",
			populate: {path: "section"}
		});
	query.exec(callback);
};
module.exports = new ProjectRepository();