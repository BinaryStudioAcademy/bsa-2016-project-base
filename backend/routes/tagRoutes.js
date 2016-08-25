var apiResponse = require('express-api-response');
var tagRepository = require('../repositories/tagRepository');
var searchService = require('../service/search-service');

module.exports = function(app) {
	app.post('/api/tags/', function(req, res, next) {
		tagRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/tags/:id', function(req, res, next) {
		tagRepository.update(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/tags/:id', function(req, res, next) {
		tagRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/tags/', function(req, res, next) {
		tagRepository.deleteMany(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/tags/', function(req, res, next) {
		tagRepository.getAll(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/tags/:id', function(req, res, next) {
		tagRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/search/tags', function (req, res, next) {
		console.log('GET request on "/api/search/tags" acquired.');
		searchService.getFilteredTags(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	}, apiResponse);

};
