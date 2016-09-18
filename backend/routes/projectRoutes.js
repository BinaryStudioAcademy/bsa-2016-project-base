var apiResponse = require('express-api-response');
var projectRepository = require('../repositories/projectRepository');
var featureRepository = require('../repositories/featureRepository');
var searchService = require('../service/search-service');
var statsService = require('../service/stat-service');
var saveProjectAndUserStory = require('../services/saveProjectAndUserStory');
var updateProjectAndUserStory = require('../services/updateProjectAndUserStory');
var mongoose = require('mongoose');


module.exports = function(app) {
	app.get('/api/projects/', function (req,res,next) {
		projectRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);

	app.get('/api/mainpage/', function (req,res,next) {
		projectRepository.getAllDataMainPage(function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);

	app.get('/api/mainpage/:orderBy', function (req,res,next) {
		projectRepository.getAllDataMainPageOrderBy(req.params.orderBy, function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);

	app.get('/api/projects/:id', function(req, res, next) {
		projectRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/projects/:id/allData', function(req, res, next) {
		projectRepository.getByAllData(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/projects/:id/features', function(req, res, next) {
		projectRepository.getByIdWithFeatures(req.params.id, function(err, data) {
			res.data = data;
			//res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/projects/:id/users-owners/', function(req, res, next) {
		projectRepository.getByIdWithStakeholders(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/projects/:id/tags/', function(req, res, next) {
		projectRepository.getByIdWithTags(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);


	app.get('/api/projects/:id/technologies/', function(req, res, next) {
		projectRepository.getByIdWithTechnologies(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);
	app.get('/api/search/projects', function (req, res, next) {
		searchService.getFilteredProjects(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/search/projects/:id', function(req, res, next) {
		projectRepository.getByIdForLocations(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/search/locations', function (req,res,next) {
		projectRepository.getAllwithLocations(function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/stats/countries', function (req,res,next) {
		statsService.getProjectsCountriesStat(req, function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/stats/tags', function (req,res,next) {
		statsService.getProjectsTagsStat(req, function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/stats/technologies', function (req,res,next) {
		statsService.getProjectsTechsStat(req, function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/stats/dates/start', function (req,res,next) {
		statsService.getProjectsDatesStart(req, function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/stats/dates/end', function (req,res,next) {
		statsService.getProjectsDatesEnd(req, function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.post('/api/projects/', function(req, res, next) {
		saveProjectAndUserStory(req, function(err, data) {
        	if (err) {
				let errors =  {};
				Object.keys(err.errors).forEach((key) => {
					errors[key] = err.errors[key].message;
				});
				res.status(400).send(errors);
				res.err = errors;
			}
			else {
				res.data = data;
				//res.json(data);
				res.err = err;
			}
			next();
		});
	}, apiResponse);

	app.put('/api/projects/:id', function(req, res, next) {
		//alert("AGA!!!");
		updateProjectAndUserStory(req, function(err, data) {
			if (err) {
				let errors =  {};
				Object.keys(err.errors).forEach((key) => {
					errors[key] = err.errors[key].message;
				});
				res.status(400).send(errors);
				res.err = errors;
			}
			else {
				res.data = data;
				//res.json(data);
				res.err = err;
			}
			next();
		});

		/*projectRepository.update(req.params.id, req.body,function(err, data) {
			res.data = data;
			//res.json(data);
			res.err = err;
			next();
		});*/
	}, apiResponse);

	app.delete('/api/projects/:id', function(req, res, next) {
		projectRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			//res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/review', function(req, res, next) {
		projectRepository.getAllInProgress(function (err,data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/review/:id', function(req, res, next) {
		projectRepository.getById(req.params.id, function (err,data) {
			featureRepository.getFeaturesWithSections(data, function (err, data) {
				var sortData = {};

				for(var i = 0, l = data.length; i < l; i++){
					var sectionName = data[i].section.name;
					sortData[sectionName] = sortData[sectionName] || [];
					sortData[sectionName].push(data[i]);
				}

				res.data = sortData;
				res.err = err;
				//res.json(data);
				next();
			});
		});
	}, apiResponse);

	app.get('/api/project-view/:id', function(req, res, next) {
		projectRepository.getDetailsById(req.params.id, function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	// Questions and Answers section

	app.post('/api/project-view/:id/questions', function(req,res,next) { // add question
		var newId = new mongoose.Types.ObjectId;
		req.body._id = newId;
		projectRepository.addQ(req.params.id, req.body, function(err,data) {
			res.data = data;
			res.data.addedId = newId;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/project-view/:id/questions/:qId/answers', function(req,res,next) { // add answer
		var newId = new mongoose.Types.ObjectId;
		req.body._id = newId;
		projectRepository.addA(req.params.id, req.params.qId, req.body, function(err,data) {
			res.data = data;
			res.data.addedId = newId;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/project-view/:id/questions/:qId', function(req,res,next){ // edit question
		projectRepository.editQ(req.params.id, req.params.qId, req.body, function(err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/project-view/:id/questions/:qId/answers/:aId', function(req,res,next){ // edit answer
		projectRepository.editA(req.params.id, req.params.qId, req.params.aId, req.body, function(err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/project-view/:id/questions/:qId', function(req,res,next){ // delete question
		projectRepository.removeQ(req.params.id, req.params.qId, function(err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/project-view/:id/questions/:qId/answers/:aId', function(req,res,next){ // delete answer
		projectRepository.removeA(req.params.id, req.params.qId, req.params.aId, function(err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};


