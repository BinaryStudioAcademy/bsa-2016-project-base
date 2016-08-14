var apiResponse = require('express-api-response');
var usersRightsRepository = require('../repositories/usersRightsRepository');


module.exports = function(app) {
	app.get('/api/rights/projects/', function (req,res,next) {
		usersRightsRepository.getAll(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.get('/api/rights/projects/:id/', function (req,res,next) {
		usersRightsRepository.getByIdWithStakeholders(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.put('/api/rights/projects/:id/', function (req,res,next) {
		usersRightsRepository.update(req.params.id, req.body,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/rights/projects/:id/users/:filter', function (req,res,next) {
		usersRightsRepository.getUsersToProjectByFilter({
			projectId: req.params.id,
			userFilter: req.params.filter
		},function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);
	
	app.get('/api/rights/projects/:id/users/:filter/owners', function (req,res,next) {
		usersRightsRepository.getUsersToProjectByFilter({
			projectId: req.params.id,
			userFilter: req.params.filter,
			user: 'owners'
		},function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);

	app.get('/api/rights/projects/:id/users/:filter/simples', function (req,res,next) {
		usersRightsRepository.getUsersToProjectByFilter({
			projectId: req.params.id,
			userFilter: req.params.filter,
			user: 'simples'
		},function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	},apiResponse);
}
