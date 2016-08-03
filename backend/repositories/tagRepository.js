var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Tag = require('../schemas/tagSchema');

function TagRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Tag;
}

TagRepository.prototype = new Repository();

module.exports = new TagRepository();