var apiResponse = require('express-api-response');
var technologieRepository = require('../repositories/technologieRepository');

module.exports = function(router) {
	router.get('/api/technologie/:id', function(req, res, next) {
		technologieRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	router.put('/api/technologie/:id', function(req, res, next) {
		technologieRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	router.delete('/api/technologie/:id', function(req, res, next) {
		technologieRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	router.post('/api/technologie/', function(req, res, next) {
		technologieRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	router.get('/api/technologie/',function (req,res,next) {
		technologieRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);


};