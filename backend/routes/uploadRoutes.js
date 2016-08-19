var apiResponse = require('express-api-response');
var fs = require('fs');
var multiparty = require('multiparty');
 
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
		var supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
		var errors = [];

		form.on('error', function(err){
			if(fs.existsSync(uploadFile.pathOnServer)) {
            	fs.unlinkSync(uploadFile.pathOnServer);
            	console.log('error');
        	}
		});

		form.on('close', function() {
			if(errors.length == 0){
				res.data = {status: 'ok', path: uploadFile.pathOnClient};
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