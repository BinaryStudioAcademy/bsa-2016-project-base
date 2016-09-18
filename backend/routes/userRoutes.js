var apiResponse = require('express-api-response');
var searchService = require('../service/search-service');
var userRepository = require('../repositories/userRepository');

module.exports = function(app) {

	app.get('/api/users/:id', function(req, res, next) {
		userRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/users/', function(req, res, next) {
		userRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/users/:id/addinprogressproject', function(req, res, next) {
		userRepository.addinProgressProject(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/users/:id/addcompletedproject', function(req, res, next) {
		userRepository.addCompletedProject(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/users/:id/changeproject', function(req, res, next) {
		userRepository.changeProject(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/users/:id', function(req, res, next) {
		userRepository.update(req.params.id, req.body ,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/users/:id', function(req, res, next) {
		userRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/users/',function (req,res,next) {
		userRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/search/users', function (req, res, next) {
		searchService.getFilteredUsers(req, function (err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};
