var apiResponse = require('express-api-response');
var technologieRepository = require('../repositories/technologieRepository');

module.exports = function(router) {
	router.get('/technologie/:id', function(req, res, next) {
		technologieRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	}, apiResponse);

	router.put('/technologie/:id', function(req, res, next) {
		technologieRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);

	router.delete('/technologie/:id', function(req, res, next) {
		technologieRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);


	router.post('/technologie/', function(req, res, next) {
		technologieRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	}, apiResponse);

	router.get('/technologie/',function (req,res,next) {
		technologieRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	},apiResponse);


};