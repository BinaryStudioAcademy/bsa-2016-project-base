var userRoutes = require('./userRoutes');
var sectionRoutes = require('./sectionRoutes');
var techologieRoutes = require('./technologyRoutes');
var projectRoutes = require('./projectRoutes');
var featureRoutes = require('./featureRoutes');
var tagRoutes = require('./tagRoutes');
var documentRoutes = require('./documentRoutes');
var uploadRoutes = require("./uploadRoutes");
var predefinedDataRoutes = require('./predefinedDataRoutes');
var usersRightsRoutes = require('./usersRightsRoutes');

module.exports = function(app) {
	return {
		userRoutes: userRoutes(app),
		techologieRoutes: techologieRoutes(app),
		sectionRoutes: sectionRoutes(app),
		projectRoutes: projectRoutes(app),
		featureRoutes: featureRoutes(app),
		tagRoutes: tagRoutes(app),
		uploadRoutes: uploadRoutes(app),
		documentRoutes: documentRoutes(app),
		predefinedDataRoutes: predefinedDataRoutes(app),
		usersRightsRoutes: usersRightsRoutes(app)
	};
};
