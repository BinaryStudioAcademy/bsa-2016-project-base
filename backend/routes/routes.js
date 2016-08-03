var userRoutes = require('./userRoutes');
var sectionRoutes = require('./sectionRoutes');
var techologieRoutes = require('./technologieRoutes');
var projectRoutes = require('./projectRoutes');
var featureRoutes = require('./featureRoutes');


module.exports = function(app) {
	return {
		userRoutes: userRoutes(app),
		techologieRoutes: techologieRoutes(app),
		sectionRoutes: sectionRoutes(app),
		projectRoutes: projectRoutes(app),
		featureRoutes: featureRoutes(app)
	};
};