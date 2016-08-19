var userRoutes = require('./userRoutes');
var sectionRoutes = require('./sectionRoutes');
var techologieRoutes = require('./technologyRoutes');
var projectRoutes = require('./projectRoutes');
var conditionRoutes =require('./conditionRoutes');
var featureRoutes = require('./featureRoutes');
var tagRoutes = require('./tagRoutes');
var stageRoutes = require('./stageRoutes');
var predefinedDataRoutes = require('./predefinedDataRoutes');

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
		predefinedDataRoutes: predefinedDataRoutes(app)
	};
};