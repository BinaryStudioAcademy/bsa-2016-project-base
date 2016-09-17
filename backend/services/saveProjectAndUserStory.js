var async = require('async');
var htmlToText = require('html-to-text');
var userRepository = require('../repositories/userRepository');
var projectRepository = require('../repositories/projectRepository');

module.exports = function(req,onResult) {
    async.waterfall([
        function(callback){
            var project = req.body.project;
            var html = project.description.descrFullText;
            project.description = {
                descrText: htmlToText.fromString(html, {
                    wordwrap: 130,
                    ignoreHref: true,
                    ignoreImage: true,
                    preserveNewlines: true
                }),
                descrFullText: html
            };

            projectRepository.add(project, function(err, data) {
                if (err) return callback (err, data);
                callback (null, data);
            });
        },
        function(data, callback){
            var projectId = data._id;
            var userStory = req.body.userStory;
            for(var key in userStory) {
                var obj = {
                    projectId: projectId,
                    dateFrom: userStory[key].dateFrom,
                    dateTo: userStory[key].dateTo
                };

                userRepository.addToProject(key, obj, function(err, data) {
                     if (err) return callback (err, data);
                });
           }
           callback (null, data);
        }], 
        function (err, result) {
            onResult(err, result);
    });
};



