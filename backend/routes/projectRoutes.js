var apiResponse = require('express-api-response');
var projectRepository = require('../repositories/technologieRepository');


module.exports = function(app) {
	app.get('/api/project/', function (req,res,next) {
		projectRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	},apiResponse);

	app.get('/api/project/:id', function(req, res, next) {
		projectRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	}, apiResponse);

	app.post('/api/project/', function(req, res, next) {
		projectRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			res.json(data);
			next();
		});
	}, apiResponse);

	app.put('/api/project/:id', function(req, res, next) {
		projectRepository.update(req.params.id, req.body,function(err, data) {
			res.data = data;
			res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/project/:id', function(req, res, next) {
		projectRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.json(data);
			res.err = err;
			next();
		});
	}, apiResponse);
};


