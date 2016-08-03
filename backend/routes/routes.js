var userRoutes = require('./userRoutes');
var sectionRoutes = require('./sectionRoutes');
module.exports = function(app) {
	return {
		userRoutes: userRoutes(app),
		sectionRoutes: sectionRoutes(app)
	};
};