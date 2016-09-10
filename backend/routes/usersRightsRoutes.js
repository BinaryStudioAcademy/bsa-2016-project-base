var apiResponse = require('express-api-response');
var usersRightsRepository = require('../repositories/usersRightsRepository');


module.exports = function(app) {
	app.get('/api/rights/', function (req,res,next) {
		usersRightsRepository.getProjectList(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.get('/api/rights/:id/', function (req,res,next) {
		usersRightsRepository.getUsersToProject(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.put('/api/rights/:id/', function (req,res,next) {
		usersRightsRepository.updateUsersToProject(req.params.id,req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/rights/:id/users/:filter', function (req,res,next) {
		let params = req.params['filter'].split('&'),filters = {};
		for(let i in params) {
			params[i] = params[i].split('=');
			filters[params[i][0]] = params[i][1];
		}
		filters['projectId'] = req['params'].id;
		usersRightsRepository.getUsersToProject(filters, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);
}
