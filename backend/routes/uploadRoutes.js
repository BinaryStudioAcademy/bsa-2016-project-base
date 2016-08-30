var apiResponse = require('express-api-response');
var uploadMedia = require('../services/uploadMedia');

module.exports = function(app) {
	app.post('/api/upload/', function(req, res, next) {
		uploadMedia(req, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};