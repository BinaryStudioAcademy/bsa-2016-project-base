var apiResponse = require('express-api-response');
var stageRepository = require('../repositories/stageRepository');
 
module.exports = function(app) {
	app.get('/api/stages/', function(req, res, next) {
		stageRepository.getAll( function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);



	app.get('/api/stages/:id', function(req, res, next) {
		stageRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.post('/api/stages/', function(req, res, next) {
		stageRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.put('/api/stages/:id', function(req, res, next) {//**** не пашет сцук
		stageRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.delete('/api/stages/:id', function(req, res, next) {
		stageRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};