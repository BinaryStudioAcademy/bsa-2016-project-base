var apiResponse = require('express-api-response');
var usersRightsRepository = require('../repositories/usersRightsRepository');


module.exports = function(app) {
	app.get('/api/rights/projects/', function (req,res,next) {
		usersRightsRepository.getProjectList(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.get('/api/rights/projects/:id/', function (req,res,next) {
		usersRightsRepository.getByIdWithStakeholders(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			console.log(data);
			next();
		});
	},apiResponse);

	app.put('/api/rights/projects/:id/', function (req,res,next) {
		usersRightsRepository.update(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/rights/projects/:id/users/:filter', function (req,res,next) {
		var params = req.params['filter'].split('&'),filters = {};
		for(var i in params) {
			params[i] = params[i].split('=');
			filters[params[i][0]] = params[i][1];
		}
		filters['projectId'] = req.params.id;
		usersRightsRepository.getUsersToProjectByFilter(
			filters, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);
}
