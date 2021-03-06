var apiResponse = require('express-api-response');
var featureRepository = require('../repositories/featureRepository');
 
module.exports = function(app) {
	
	app.get('/api/features/:id', function(req, res, next) {
		featureRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/features/',function (req,res,next) {
		featureRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.get('/api/featureswithsections/',function (req,res,next) {
		featureRepository.getAllFeaturesWithSection(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);
	
	app.get('/api/features/:id/sections', function(req, res, next) {
		featureRepository.getByIdWithSection(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
	
	app.put('/api/features/:id', function(req, res, next) {
		featureRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/features/', function(req, res, next) {
		featureRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
	
	app.delete('/api/features/:id', function(req, res, next) {
		featureRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/features/', function(req, res, next) {
		featureRepository.deleteMany(req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
	
};