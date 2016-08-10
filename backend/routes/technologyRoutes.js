var apiResponse = require('express-api-response');
var multer = require('multer');
var upload = multer({dest: 'upload/resources/tech/'});
var fs = require('fs');
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
        if (req.file.mimetype.indexOf('image/') === 0) {
            var tmp_path = req.file.path;
            var target_path = 'upload/resources/tech/' + req.file.originalname;
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);

            src.pipe(dest);
            fs.unlink(tmp_path);
            //  fs.rename(tmp_path, req.file.originalname);
            res.json({
                'file': '/upload/resources/tech/' + req.file.originalname,
                'type': 'success'
            });
        } else {
            res.json({
                'file': '',
                'type': 'error'
            });
        }
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