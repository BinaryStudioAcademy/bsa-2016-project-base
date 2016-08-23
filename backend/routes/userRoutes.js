var apiResponse = require('express-api-response');
var userRepository = require('../repositories/userRepository');
var searchService = require('../service/search-service');

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
		console.log('GET request on "/api/search/users" acquired.');
		searchService.getFilteredUsers(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);
};