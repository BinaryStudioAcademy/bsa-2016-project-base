var fs = require('fs');
var http = require('http');
var https = require('https');
var uuid = require('node-uuid');
var apiResponse = require('express-api-response');
var uploadMedia = require('../services/uploadMedia');
var origin = 'http://localhost:6500/';  //?  this string have to use from config db (!)

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
		download(req.body.link,method[0],folder + newFileName,function (el) {
			res.json({ 'link' : newFileName });
		})
	});

	app.post('/api/uploadByLinkAttachments/',function (req,res,next) {
		var folder = './upload/';
		var fileExt = req.body.link.slice(req.body.link.lastIndexOf('.'));
		var newFileName = String(uuid.v1()) + fileExt;
		var method = req.body.link.split(':');
		let name = req.body.link.slice(req.body.link.lastIndexOf('/')+1,req.body.link.lastIndexOf('.'));
		download(req.body.link,method[0],folder+newFileName,function (el) {
			res.json({
				'name' : name,
				'path' : origin+'upload/' + newFileName
			})
		})
	});
};

function download(url,method, dest, cb) {
	var mt = (method === 'http') ? http : https;
	var file = fs.createWriteStream(dest);
	var request = mt.get(url, function(response) {
		response.pipe(file);
		file.on('finish', function() {
			file.close(cb); 
		});
	}).on('error', function(err) {
		if (cb) cb(err.message);
	});
};