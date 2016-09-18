/**
 * Created by razorka on 18.09.16.
 */
var async = require('async');
var projectRepository = require('../repositories/projectRepository');
var featureRepository = require('../repositories/featureRepository');
var sectionRepository = require('../repositories/sectionRepository');
module.exports = function (id, onResult) {
    let resData = {};
    async.waterfall([

            function (callback) {
                projectRepository.getByAllData(id, function (err, data) {
                    if (err) return callback(err, data);
                    resData.features = data.features;
                    callback(null, resData);
                });

            },
            function (dat, callback) {
                let sections = [];
                let temp = dat.features;
                async.each(temp, function (ID, callback2) {
                    featureRepository.getByIdWithSection(ID._id, function (err, result) {
                        if (result) {
                            sections.push(result[0].section._id);
                        }
                        callback2(null);
                    });
                }, function (err) { // this function gets called when the loop is done
                    resData.sections = sections;
                    callback (null, resData);
                });
            },
            function (dataWithSections, callback) {
                projectRepository.delete(id, function (err,data) {
                   if(err){
                       callback(data);
                   }
                });
                async.each(dataWithSections.features, function (feature, callback2) {
                   featureRepository.delete(feature._id,function (err,res) {
                       callback2(null);
                   })
                }, function (err) { // this function gets called when the loop is done
                    if(err) {
                        callback(err, resData);
                    }
                });
                async.each(dataWithSections.sections, function (section, callback3) {
                    /*
                    TODO
                    why null??
                     */
                    sectionRepository.delete(section._id,function (err,res) {
                        callback3(null);
                    })
                }, function (err) { // this function gets called when the loop is done
                    if(err) {
                        callback(err, resData);
                    }
                });
            }
        ],
        function (err, result) {
            onResult(err, result);
        });
};