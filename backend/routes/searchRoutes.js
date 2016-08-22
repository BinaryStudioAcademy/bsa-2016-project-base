var apiResponse = require('express-api-response');
var projectRepository = require('../repositories/projectRepository');
var getFilteredProjects = require('../services/project-list-filters.js');
var getFilteredTags = require('../services/tags-list-filters.js');
var getFilteredTechs = require('../services/techs-list-filters.js');
var getFilteredUsers = require('../services/users-list-filters.js');

module.exports = function(app) {
	
	app.get('/api/search/projects', function (req, res, next) {
		//console.log('GET request on "/api/search/projects" acquired.');
		getFilteredProjects(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);


	app.get('/api/search/tags', function (req, res, next) {
		console.log('GET request on "/api/search/tags" acquired.');
		getFilteredTags(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);

	app.get('/api/search/techs', function (req, res, next) {
		console.log('GET request on "/api/search/tech" acquired.');
		getFilteredTechs(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);

	app.get('/api/search/users', function (req, res, next) {
		console.log('GET request on "/api/search/users" acquired.');
		getFilteredUsers(req, function (err, data) {
			res.data = data;
			res.err = err;
			//res.json(data);
			next();
		});
	},apiResponse);
};


