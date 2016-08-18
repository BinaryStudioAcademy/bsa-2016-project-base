var userRoutes = require('./userRoutes');
var sectionRoutes = require('./sectionRoutes');
var techologieRoutes = require('./technologyRoutes');
var projectRoutes = require('./projectRoutes');
var conditionRoutes =require('./conditionRoutes');
var featureRoutes = require('./featureRoutes');
var tagRoutes = require('./tagRoutes');
var stageRoutes = require('./stageRoutes');
var documentRoutes = require("./documentRoutes");
var uploadRoutes = require("./uploadRoutes");


module.exports = function(app) {
	return {
		userRoutes: userRoutes(app),
		techologieRoutes: techologieRoutes(app),
		sectionRoutes: sectionRoutes(app),
		projectRoutes: projectRoutes(app),
		conditionRoutes:conditionRoutes(app),
		featureRoutes: featureRoutes(app),
		tagRoutes: tagRoutes(app),
		stageRoutes: stageRoutes(app),
		uploadRoutes: uploadRoutes(app),
		documentRoutes: documentRoutes(app)
	};
};

/*
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
});*/