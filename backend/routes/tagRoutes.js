var apiResponse = require('express-api-response');
var tagRepository = require('../repositories/tagRepository');

module.exports = function(app) {
	app.post('/api/tag/', function(req, res, next) {
		tagRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/tag/:id', function(req, res, next) {
		tagRepository.update(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/tag/:id', function(req, res, next) {
		tagRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/tag', function(req, res, next) {
		tagRepository.getAll(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
		}, apiResponse);

	app.get('/api/tag/:id', function(req, res, next) {
		tagRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};