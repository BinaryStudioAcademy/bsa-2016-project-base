var apiResponse = require('express-api-response');
var uploadMedia = require('../services/uploadMedia');

module.exports = function(app) {
	app.post('/api/upload/', function(req, res, next) {
		uploadMedia(req, function(data){
			res.data = data;
			next();
		});
	},apiResponse);
};