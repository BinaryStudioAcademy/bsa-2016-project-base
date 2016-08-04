var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Stage = require('../schemas/stageSchema');

function StageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Stage;
}

StageRepository.prototype = new Repository();

module.exports = new StageRepository();