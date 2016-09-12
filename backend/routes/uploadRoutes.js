var apiResponse = require('express-api-response');
var uploadMedia = require('../services/uploadMedia');
var uuid = require('node-uuid');
var fs = require('fs');
var http = require('http');
var https = require('https');
var origin = 'http://localhost:6500/';
module.exports = function(app) {
	app.post('/api/upload/', function(req, res, next) {
		uploadMedia(req, function(data){
			res.data = data;
			next();
		});
	},apiResponse);

	app.post('/api/uploadByLink/', function(req, res, next) {
		var folder = './upload/resources/tech/';
		var fileExt = req.body.link.slice(req.body.link.lastIndexOf('.'));
		var newFileName = String(uuid.v1()) + fileExt;
		var method = req.body.link.split(':');
		download(req.body.link,method[0],folder+newFileName,function (el) {
			res.json({
				'link' : newFileName
			})
		})
	});

	app.post('/api/uploadByLinkAttachments/',function (req,res,next) {
		var folder = './upload/';
		var fileExt = req.body.link.slice(req.body.link.lastIndexOf('.'));
		var newFileName = String(uuid.v1()) + fileExt;
		var method = req.body.link.split(':');
		download(req.body.link,method[0],folder+newFileName,function (el) {
			res.json({
				'name' : newFileName,
				'path' : origin+'upload/' + newFileName
			})
		})
	});
};

function download(url,method, dest, cb) {
	var mt;
	if(method === 'http'){
		mt = http;
	}else{
		mt = https;
	}
	var file = fs.createWriteStream(dest);
	var request = mt.get(url, function(response) {
		response.pipe(file);
		// console.log(file);
		file.on('finish', function() {
			file.close(cb);  // close() is async, call cb after close completes.
		});
	}).on('error', function(err) { // Handle errors
		//fs.unlink(dest); // Delete the file async. (But we don't check the result)
		if (cb) cb(err.message);
	});
};