var apiResponse = require('express-api-response');
var technologieRepository = require('../repositories/technologieRepository');

module.exports = function(app) {
	app.get('/api/technologie/:id', function(req, res, next) {
		technologieRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/technologie/:id', function(req, res, next) {
		technologieRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/technologie/:id', function(req, res, next) {
		technologieRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	// app.delete('/api/technologie/', function(req, res, next) {
	// 	technologieRepository.deleteMany(req.body,function(err, data) {
	// 		res.data = data;
	// 		res.err = err;
	// 		next();
	// 	});
	// }, apiResponse);


	app.post('/api/technologie/', function(req, res, next) {
		technologieRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/technologie/',function (req,res,next) {
		technologieRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);


};