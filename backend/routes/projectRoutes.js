var apiResponse = require('express-api-response');
var projectRepository = require('../repositories/projectRepository');
var featureRepository = require('../repositories/featureRepository');
var searchService = require('../service/search-service');

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
		console.log('GET request on "/api/search/projects" acquired.');
		searchService.getFilteredProjects2(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.post('/api/projects/', function(req, res, next) {
		projectRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.put('/api/projects/:id', function(req, res, next) {
		projectRepository.update(req.params.id, req.body,function(err, data) {
			res.data = data;
			//res.json(data);
			res.err = err;
			next();
		});
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
};


