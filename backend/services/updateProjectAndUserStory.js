var async = require('async');
var userRepository = require('../repositories/userRepository');
var projectRepository = require('../repositories/projectRepository');

module.exports = function(req,onResult) {
    async.waterfall([
        function(callback){
            projectRepository.update(req.body.project._id, req.body.project, function(err, data) {
                if (err) return callback (err, data);
                callback (null, data);
            });
        },
        function(data, callback){
            var projectId = data._id;
            var userHistory = req.body.userHistory;
            console.log("userHistory!!! " + userHistory);
            for(var key in userHistory) {
                console.log("userHistory[key]!!! " + userHistory[key]);
                userRepository.changeProject(key, userHistory[key], function(err, data) {
                     if (err) return callback (err, data);
                });
           }
           callback (null, data);
        }],
        function (err, result) {
            onResult(err, result);
    });
};



