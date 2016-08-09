var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Technogolie = require('../schemas/techologySchema');
var Feature = require('../schemas/featureSchema');

function FeatureRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Feature;
}

FeatureRepository.prototype = new Repository();

module.exports = new FeatureRepository();