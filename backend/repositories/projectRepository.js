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
	var query = model.findOne({_id:id})
				// .populate('stage')
//				.populate('condition')
				.populate('users')
				.populate('owners');
	query.exec(callback);
};

ProjectRepository.prototype.getByIdWithTags = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id})
				// .populate('stage')
//				.populate('condition')
				.populate('tags');
	query.exec(callback);
};

ProjectRepository.prototype.getByIdWithTechnologies = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id})
				.populate('technologies');
	query.exec(callback);
};

Repository.prototype.getByIdWithFeatures = function(id, callback){
	var model = this.model;
	var query = model.findOne({_id:id})
					.populate('features');
	query.exec(callback);
};

Repository.prototype.getAllDataMainPage = function(callback){
	var model = this.model;
	var query = model.find().populate(['technologies', 'tags', 'users']);
	query.exec(callback);
};

ProjectRepository.prototype.getAll = function(callback){
    var model = this.model;
    var query = model.find().populate(['owners', 'users']);
    query.exec(callback);
};

ProjectRepository.prototype.getAllInProgress = function(callback){
	var model = this.model;
	var query = model.find({status: {$not: { $eq: 'Completed' }}, features: {$not: {$size: 0}}}, {_id: 1, projectName: 1, description: 1});
	query.exec(callback);
};

module.exports = new ProjectRepository();