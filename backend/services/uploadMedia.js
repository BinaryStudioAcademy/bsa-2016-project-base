var fs = require('fs');
var multiparty = require('multiparty');
var uuid = require('node-uuid');
var origin = 'http://localhost:6500/'
var supportMimeTypes = [
		'image/jpg', 
		'image/jpeg', 
		'image/png', 
		'application/rtf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'text/plain',
		'text/xml',
		'application/pdf',
		'application/zip',
		'application/x-compressed-zip',
		'application/x-rar-compressed',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/octet-stream'
	];

module.exports = function(request, callback) {
	var form = new multiparty.Form();
	var uploadFile = {
		pathOnClient: '',
		pathOnServer: '',
		type: '',
		size: 0
	};

	//var maxSize = 2 * 1024 * 1024;
	//var sizeLimitMb = (maxSize / 1024 / 1024);
	var errors = [];
	var data = null;
	var sourceName;
	var sourceType;
	var newFileName;

	form.on('aborted', function(err){
		console.log('aborted',err);
		
	});


	form.on('error', function(err){
		console.log('error',err);
		if(fs.existsSync(uploadFile.pathOnServer)) {
        	fs.unlinkSync(uploadFile.pathOnServer);
    	}
	});

	form.on('close', function() {
		if(errors.length == 0){
			console.log('Close ',sourceName);
			data = {
				name: sourceName,
				path: uploadFile.pathOnClient
			};
			callback(data);
		} else {
			data = {error: errors.join(' '), name: sourceName};
			callback(data);
		}
	});
	
	form.on('part', function(part) {
		console.log('name ',part.name);
		sourceName  = part.filename;
		sourceType  = sourceName.slice(sourceName.lastIndexOf('.'),sourceName.length);
		newFileName = String(uuid.v1()) + sourceType;
        //uploadFile.size = part.byteCount;
        uploadFile.type = part.headers['content-type'];
        uploadFile.pathOnServer = './upload/' + newFileName;
		uploadFile.pathOnClient = origin + 'upload/' + newFileName;

        /*if(uploadFile.size > maxSize) {
	        errors.push('File size is ' + (uploadFile.size / 1024 / 1024).toFixed(2) + ' MB. Limit is ' + sizeLimitMb + ' MB.');
	    }*/

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

    form.parse(request);
}