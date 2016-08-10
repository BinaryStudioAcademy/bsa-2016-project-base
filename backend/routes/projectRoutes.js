var apiResponse = require('express-api-response');
var projectRepository = require('../repositories/projectRepository');
var featureRepository = require('../repositories/featureRepository');


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

	app.get('/api/projects/:id', function(req, res, next) {
		projectRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/projects/:id/features', function(req, res, next) {
		projectRepository.getById(req.params.id, function(err, data = {}) {
			featureRepository.getDetails(data['features'], function (err, data) {

				res.data = data;
				//res.json(data);
				res.err = err;
				next();
			});
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
};


