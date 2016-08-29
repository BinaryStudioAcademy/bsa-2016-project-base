var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var User = require('../schemas/userSchema');

function UserRepository() {
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();


UserRepository.prototype.addinProgressProject = function(userId, obj, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,
		{$push: {"userHistory":
		{
			ProjectId: obj.ProjectId,
			DateFrom: obj.DateFrom,
			DateTo: null,

		}}},
		{}
	);

	query.exec(callback);
};

UserRepository.prototype.addCompletedProject = function(userId, obj, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,
		{$push: {"userHistory": {
			ProjectId: obj.ProjectId,
			DateFrom: obj.DateFrom,
			DateTo: obj.DateTo,

		}}},
		{}
	);

	query.exec(callback);
};
//if we need change dates for any object, we modify userHistory in front-end, and send full array "userHistory"
UserRepository.prototype.changeProject = function(userId, arr, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(
		userId,
		{set: {"userHistory": arr}},
		{}
	);

	query.exec(callback);
};


module.exports = new UserRepository();