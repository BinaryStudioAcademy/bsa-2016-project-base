var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Feature = require('../schemas/featureSchema');

function FeatureRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Feature;
}

FeatureRepository.prototype = new Repository();

// Repository.prototype.getAllFeaturesWithSection = function(callback){
//     var model = this.model;
//     var query = model.find().populate('section');
//     query.exec(callback);
// };

Repository.prototype.getAllFeaturesWithSection = function(callback){
    var model = this.model;
    var query = model.find()
    			.populate({
    				path: 'section',
    				model: 'Section'
    			});
    query.exec(callback);
};

Repository.prototype.getByIdWithSection = function(id, callback){
    var model = this.model;
    var query = model.find({_id:id})
    			.populate({
    				path: 'section',
    				model: 'Section'
    			});
    query.exec(callback);
};

Repository.prototype.getFeaturesWithSections = function(project, callback){
    var arrOfId = project['features'] || [];
    var model = this.model;
    var query = model.find({_id: {$in: arrOfId}}, {_id: 1, featureName: 1, section: 1}).populate('section');
    query.exec(callback);
};
module.exports = new FeatureRepository();