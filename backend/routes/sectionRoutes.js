var apiResponse = require('express-api-response');
var sectionRepository = require('../repositories/sectionRepository');

module.exports = function (app) {
    app.get('/api/sections/:id', function (req, res, next) {
        sectionRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.get('/api/sections/', function (req, res, next) {
        sectionRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    app.put('/api/sections/:id', function (req, res, next) {
        sectionRepository.update(req.params.id, req.body, function (err, data) {
            res.err = err;
            res.data = data;
            next();
        })
    }, apiResponse);
    app.post('/api/sections/', function (req, res, next) {
        sectionRepository.add(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.delete('/api/sections/:id', function (req, res, next) {
        sectionRepository.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse)
};
