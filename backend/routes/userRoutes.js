var apiResponse = require('express-api-response');
var userRepository = require('../repositories/userRepository');

module.exports = function(app) {
	app.get('/api/user/:id', function(req, res, next) {
		userRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/user/', function(req, res, next) {
		userRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/user/:id', function(req, res, next) {
		userRepository.update(req.params.id, req.body ,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/user/:id', function(req, res, next) {
		userRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/user/',function (req,res,next) {
		userRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};