var apiResponse = require('express-api-response');
var multer = require('multer');
var upload = multer({dest: 'upload/resources/tech/'});
var fs = require('fs');
var path = require('path');
var technologieRepository = require('../repositories/technologyRepository');
var Docxtemplater = require('docxtemplater');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var key = ('user.json');
var oauth2Client = new OAuth2('56886673798-1v8ntnk0hu1hlcvq5614ip2p8k816imv.apps.googleusercontent.com','6eo-nxTgCMEdiN3jlH1gXMrn', 'http://localhost:3000/api/pirojok/');
var scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.profile'
];
var open = require('open');

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
    app.delete('/api/file/', function (req, res, next) {
        var file =  req.body.file.substring(1);
        fs.unlink(file,function (err) {
            console.log(err);
        });
        res.end();
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

    app.post('/api/createdoc/', function (req, res, next) {
        var data = req.body;
        var content = fs
            .readFileSync("upload/doc_schema/doc.docx", "binary");
        var doc = new Docxtemplater(content);
        doc.setData({
            "techName": data.techName,
            "techDescription":data.techDescription,
            "phone":"0652455478",
            "techAvatar": data.techAvatar
        });
        doc.render();

        var buf = doc.getZip()
            .generate({type:"nodebuffer"});
        fs.writeFileSync("upload/"+ data.techName+".docx",buf);
        res.json({
            filepath: "upload/"+ data.techName+".docx"
        })


        var url = oauth2Client.generateAuthUrl({
            access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
            scope: scopes // If you only need one scope you can pass it as string
        });

        open(url);

    });


    app.get('/api/pirojok/',function (req,res,next) {
        var code = req.query.code;
        oauth2Client.getToken(code, function(error, tokens) {
            if (error) {
                res.send(error)
            }
            var accessToken = tokens.access_token;
            oauth2Client.setCredentials({
                access_token: accessToken
            });
            var drive = google.drive({version: 'v3', auth: oauth2Client});
            drive.files.create({
                resource: {
                    name: 'test.docx',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                },
                fields: 'webViewLink',
                media: {
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    body: fs.createReadStream('upload/MongoDb.docx') // read streams are awesome!
                }
            }, function (err, file, res) {
                console.log("Link: ", file.webViewLink);
                console.log(err);
            });
        })



    });


};