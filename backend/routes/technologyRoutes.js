var fs = require('fs');
var path = require('path');
var multer = require('multer');
var apiResponse = require('express-api-response');
var upload = multer({dest: 'upload/resources/tech/'});
var searchService = require('../service/search-service');
var technologieRepository = require('../repositories/technologyRepository');

module.exports = function (app) {

    app.get('/api/technologies/:id', function (req, res, next) {
        technologieRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put('/api/technologies/:id', function (req, res, next) {
        technologieRepository.update(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete('/api/technologies/:id', function (req, res, next) {
        technologieRepository.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post('/api/file/', upload.single('afile'), function (req, res, next) {
        if (req.file.mimetype.indexOf('image/') === 0) {
            var tmp_path = req.file.path;
            var target_path = 'upload/resources/tech/' + req.file.originalname;
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);

            src.pipe(dest);
            fs.unlink(tmp_path);
            res.json({
                'link': req.file.originalname,
                'type': 'success'
            });
        } else {
            res.json({
                'link': '',
                'type': 'error'
            });
         }
    });

    app.delete('/api/file/', function (req, res, next) {
        var file =  req.body.file.substring(1);
        fs.unlink(file,function (err) {
            console.log(err);
        });
        res.end();
    });

    app.post('/api/technologies/', function (req, res, next) {
        console.log(req.body);
        technologieRepository.add(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get('/api/technologies/', function (req, res, next) {
        technologieRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get('/api/search/techs', function (req, res, next) {
        searchService.getFilteredTechs(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};