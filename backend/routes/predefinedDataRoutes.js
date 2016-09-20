var apiResponse = require('express-api-response');
var fetchPredefinedData = require('../services/fetchPredefinedData');
 
module.exports = function(app) {
	
	app.get('/api/predefined/', function(req, res, next) {
		fetchPredefinedData(function(err, data) {
        	res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};