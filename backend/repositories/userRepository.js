var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var User = require('../schemas/userSchema');

function UserRepository() {
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();


UserRepository.prototype.addToProject = function(userId, obj, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,
		{$push: {"userHistory":
		{
			projectId: obj.projectId,
			dateFrom: obj.dateFrom,
			dateTo: obj.dateTo

		}}},
		{}
	);

	query.exec(callback);
};

UserRepository.prototype.addinProgressProject = function(userId, obj, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,{
			$push: {
				"userHistory":{
					projectId: obj.ProjectId,
					dateFrom: obj.DateFrom,
					dateTo: null,
				}
			}
		},{}
	);

	query.exec(callback);
};

UserRepository.prototype.addCompletedProject = function(userId, obj, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,{
			$push: {
				"userHistory": {
					ProjectId: obj.ProjectId,
					DateFrom: obj.DateFrom,
					DateTo: obj.DateTo,
				}
			}
		},{}
	);

	query.exec(callback);
};
UserRepository.prototype.changeProject = function(userId, arr, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,{
			set: {	"userHistory": arr }
		},{}
	);

	query.exec(callback);
};


module.exports = new UserRepository();