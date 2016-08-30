var apiResponse = require('express-api-response');
var fs = require('fs');
var multiparty = require('multiparty');
var iconsPath = '/icons/';
var server = 'http://localhost:6500'
var supportMimeTypes = [
				'image/jpg', 
				'image/jpeg', 
				'image/png', 
				'application/rtf',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'text/plain',
				'application/xml',
				'application/zip',
				'application/x-compressed-zip',
				'application/x-rar-compressed',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/octet-stream'
				];
var mimeTypeIcons = {
	'application/msword' : 'doc.png',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx.png',
	'text/plain':'txt.png',
	'application/xml': 'xml.png',
	'application/zip': 'zip.png',
	'application/x-compressed-zip': 'zip.png',
	'application/x-rar-compressed': 'rar.png',
	'application/vnd.ms-excel': 'xls.png',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx.png',
}


module.exports = function(app) {

	app.post('/api/upload/', function(req, res, next) {
		var form = new multiparty.Form();
		var uploadFile = {
			pathOnClient: '',
			pathOnServer: '',
			type: '',
			size: 0
		};
		var maxSize = 2 * 1024 * 1024;
		
		var errors = [];

		form.on('error', function(err){
			if(fs.existsSync(uploadFile.pathOnServer)) {
            	fs.unlinkSync(uploadFile.pathOnServer);
            	console.log('error');
        	}
		});

		form.on('close', function() {
			if(errors.length == 0){
				var path = server+uploadFile.pathOnClient;
				var icon = iconsPath + mimeTypeIcons[uploadFile.type];

				res.data = {
					status: 'ok', 
					path: path, 
					thumb: uploadFile.type.indexOf('image') ? icon : path
						
				};
				next();
			} else {
				if(fs.existsSync(uploadFile.pathOnServer)) {
					fs.unlinkSync(uploadFile.pathOnServer);
				}
				res.err = JSON.stringify({status: 'bad', errors: errors});
				next();
			}
		});
		
		form.on('part', function(part) {
	        uploadFile.size = part.byteCount;
	        uploadFile.type = part.headers['content-type'];
	        uploadFile.pathOnServer = './upload/' + part.filename;
			uploadFile.pathOnClient = '/upload/' + part.filename;
			console.log(' part  ', part);
			console.log(' uploadFile.type  ', uploadFile.type);
	        if(uploadFile.size > maxSize) {
    	        errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
    	    }
	
	        if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
        	    errors.push('Unsupported mimetype ' + uploadFile.type);
	        }
		
			if(errors.length == 0) {
            	var out = fs.createWriteStream(uploadFile.pathOnServer);
            	part.pipe(out);
        	}
        	else {
	            part.resume();
    	    }
    	});

	    form.parse(req);
	}, apiResponse);
};