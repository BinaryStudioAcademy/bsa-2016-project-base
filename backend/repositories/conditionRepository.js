var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Condition = require('../schemas/conditionSchema');

function ConditionRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Condition;
}

ConditionRepository.prototype = new Repository();

module.exports = new ConditionRepository();