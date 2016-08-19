var apiResponse = require('express-api-response');
var conditionRepository = require('../repositories/conditionRepository');
 
module.exports = function(app) {
    app.get('/api/conditions/', function(req, res, next) {
		conditionRepository.getAll( function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);



	app.get('/api/conditions/:id', function(req, res, next) {
		conditionRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);




	app.post('/api/conditions/', function(req, res, next) {
		conditionRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);



app.put('/api/conditions/:id', function(req, res, next) {//**** не пашет сцук
  conditionRepository.update(req.params.id,req.body,function(err, data) {
   res.data = data;
   res.err = err;
   next();
  });
 }, apiResponse);

app.delete('/api/conditions/:id', function(req, res, next) {
		conditionRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};