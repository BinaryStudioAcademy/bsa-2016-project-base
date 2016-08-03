var apiResponse = require('express-api-response');
var featureRepository = require('../repositories/featureRepository');

module.exports = function(app) {
	
	app.get('/api/feature/:id', function(req, res, next) {
		featureRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	}, apiResponse);

	app.get('/api/feature/',function (req,res,next) {
		featureRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	},apiResponse);
	
	app.put('/api/feature/:id', function(req, res, next) {
		featureRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/feature/', function(req, res, next) {
		featureRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	}, apiResponse);
	
	app.delete('/api/feature/:id', function(req, res, next) {
		featureRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);





};