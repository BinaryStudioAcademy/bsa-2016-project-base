var async = require('async');
var userRepository = require('../repositories/userRepository');
var tagRepository = require('../repositories/tagRepository');
var technologyRepository = require('../repositories/technologyRepository');
var featureRepository = require('../repositories/featureRepository');
var sectionRepository = require('../repositories/sectionRepository');

module.exports = function(onResult) {
    var collections = {};
    async.parallel([
        function(callback) {
        	userRepository.getAll(function (err,data) {
        		if (err) return callback(err);
				collections.users = data;
				callback();
			});
        },
        function(callback) {
        	tagRepository.getAll(function (err,data) {
        		if (err) return callback(err);
				collections.tags = data;
				callback();
			});
        },
        function(callback) {
        	technologyRepository.getAll(function (err,data) {
        		if (err) return callback(err);
				collections.technologies = data;
				callback();
			});
        },
        /*function(callback) {
        	featureRepository.getAll(function (err,data) {
        		if (err) return callback(err);
				collections.features = data;
				callback();
			});
        },
        function(callback) {
        	sectionRepository.getAll(function (err,data) {
        		if (err) return callback(err);
				collections.sections = data;
				callback();
			});
        },*/
    ],  function(err) { 
    		onResult(err, collections)
    });
};



