var apiResponse = require('express-api-response');
var sectionRepository = require('../repositories/sectionRepository');

module.exports = function (app) {
    app.get('/api/section/:id', function (req, res, next) {
        sectionRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.get('/api/section/', function (req, res, next) {
        sectionRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    app.put('/api/section/:id', function (req, res, next) {
        sectionRepository.update(req.params.id, req.body, function (err, data) {
            res.err = err;
            res.data = data;
            next();
        })
    }, apiResponse);
    app.post('/api/section/', function (req, res, next) {
        sectionRepository.add(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.delete('/api/section/:id', function (req, res, next) {
        sectionRepository.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse)
};
