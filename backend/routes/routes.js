var tagRoutes = require('./tagRoutes');
var userRoutes = require('./userRoutes');
var uploadRoutes = require("./uploadRoutes");
var sectionRoutes = require('./sectionRoutes');
var projectRoutes = require('./projectRoutes');
var featureRoutes = require('./featureRoutes');
var documentRoutes = require('./documentRoutes');
var techologieRoutes = require('./technologyRoutes');
var usersRightsRoutes = require('./usersRightsRoutes');
var predefinedDataRoutes = require('./predefinedDataRoutes');

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
