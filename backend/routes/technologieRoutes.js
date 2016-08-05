var apiResponse = require('express-api-response');
var technologieRepository = require('../repositories/technologieRepository');

module.exports = function(router) {
	router.get('/api/technologies/:id', function(req, res, next) {
		technologieRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	router.put('/api/technologies/:id', function(req, res, next) {
		technologieRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	router.delete('/api/technologies/:id', function(req, res, next) {
		technologieRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	router.post('/api/technologies/', function(req, res, next) {
		//console.log('route req', req);
		technologieRepository.add(req.body, function(err, data) {
			res.data = data;
			console.log("router.post('/api/technologies/') acquire data: ", data);
			res.err = err;
			console.log("router.post('/api/technologies/') generate error: ", err);
			next();
		});
	}, apiResponse);

	router.get('/api/technologies/',function (req,res,next) {
		technologieRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);


};