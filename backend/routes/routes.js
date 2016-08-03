var userRoutes = require('./userRoutes');
var techologieRoutes = require('./technologieRoutes');
module.exports = function(app) {
	return {
		userRoutes: userRoutes(app),
		techologieRoutes: techologieRoutes(app)
	};
};