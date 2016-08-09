var apiResponse = require('express-api-response');
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var technologieRepository = require('../repositories/technologyRepository');

module.exports = function (app) {
    app.get('/api/technology/:id', function (req, res, next) {
        technologieRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put('/api/technology/:id', function (req, res, next) {
        technologieRepository.update(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete('/api/technology/:id', function (req, res, next) {
        technologieRepository.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    // app.delete('/api/technologie/', function(req, res, next) {
    // 	technologieRepository.deleteMany(req.body,function(err, data) {
    // 		res.data = data;
    // 		res.err = err;s
    // 		next();
    // 	});
    // }, apiResponse);

    app.post('/api/file/', upload.single('afile'), function (req, res, next) {
        console.log(req.file);
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
    });



    app.post('/api/technology/', function (req, res, next) {
        technologieRepository.add(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get('/api/technology/', function (req, res, next) {
        technologieRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


};