"use strict";

var async = require("async");
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');
var Users = require('../schemas/userSchema');
var Projects = require('../schemas/projectSchema');
var subtools = require('./search-service-subtools.js');

class SearchService {

    getFilteredTags(req, callback) {
        console.log(`getFilteredTags() -> acquired request params: tag = ${req.query.tag}`);
        const queryTag = (req.query.tag == undefined)? '': '^'.concat(req.query.tag);
        var query = Tags.find({
            tagName: {$regex: queryTag, $options:"$i"}
        });

        query.exec(callback);
    }

    getFilteredTechs(req, callback) {
        console.log(`getFilteredTechs() -> acquired request params: tech = ${req.query.tech}`);
        const queryTech = (req.query.tech == undefined)? '': '^'.concat(req.query.tech);
        var query = Techs.find({
            techName: {$regex: queryTech, $options:"$i"}
        });

        query.exec(callback);
    }

    getFilteredUsers(req, callback) {
        console.log(`getFilteredUsers() -> acquired request params: user = ${req.query.user}`);
        const queryUser = (req.query.user == undefined)? '': '^'.concat(req.query.user);
        var query = Users.find({
            userName: {$regex: queryUser, $options:"$i"}
        });

        query.exec(callback);
    }


    getFilteredProjects(req, callback) {

        let searchFilters = subtools.getSearchFiltersFromRequest(req);

        var searchReturn = {
            queryName: searchFilters.queryProjName,
            queryUsers: searchFilters.queryProjUsers,
            queryOwners: searchFilters.queryProjOwners,
            queryTags: searchFilters.queryProjTags,
            queryTechs: searchFilters.queryProjTechs,
            queryDateFrom: searchFilters.queryProjDateFrom,
            queryDateTo: searchFilters.queryProjDateTo,
            querySkip: searchFilters.queryProjSkip,
            queryLimit: searchFilters.queryProjLimit,
            sortedProjList: [],
            found: 0
        };
        //console.log('searchReturn: ', searchReturn);
        console.log('searchFilters: ', searchFilters);

        async.parallel({
            filteredUsersIds: 	function(callback_){
                subtools.getUsersIdFromSearchQuery(searchFilters.queryProjUsers, callback_);
            },
            filteredOwnersIds:  function(callback_){
                subtools.getOwnersIdFromSearchQuery(searchFilters.queryProjOwners, callback_);
            },
            filteredTagsIds:    function(callback_){
                subtools.getTagsIdFromSearchQuery(searchFilters.queryProjTags, callback_);
            },
            filteredTechsIds:   function(callback_){
                subtools.getTechsIdFromSearchQuery(searchFilters.queryProjTechs, callback_);
            }
        }, function(err, res){
            console.log('async res: ', res);
            //searchReturn.selectedIds = res;

            let datesQuerySelection = [];
            searchFilters.queryProjDateFrom.forEach((elem,ind,arr)=>{datesQuerySelection.push(
                {$and: [{timeBegin: {$lte: elem}}, {timeEnd: {$gte: elem}}]},
                {$and: [{timeBegin: {$gte: elem}}, {timeBegin: {$lte: searchFilters.queryProjDateTo[ind]}}]}
            )});

            let projQueryObj = {
                projectName: {$regex: searchFilters.queryProjName, $options:'$i'},
                $or: datesQuerySelection
            };
            if (res.filteredUsersIds != null) {projQueryObj.users = {$in: res.filteredUsersIds}};
            if (res.filteredOwnersIds != null) {projQueryObj.owners = {$in: res.filteredOwnersIds}};
            if (res.filteredTagsIds != null) {projQueryObj.tags = {$in: res.filteredTagsIds}};
            if (res.filteredTechsIds!= null) {projQueryObj.technologies = {$in: res.filteredTechsIds}};
            console.log('projQueryObj', projQueryObj);

            var query = Projects.find(projQueryObj,
                {features: 0, questions: 0, screenShots: 0, attachments: 0},
                {skip: searchFilters.queryProjSkip, limit: searchFilters.queryProjLimit, sort: {_id: -1}})
                .populate([{
                    path: 'users',
                    model: 'User',
                    select: 'login userName userSurname position'
                }, {
                    path: 'owners',
                    model: 'User',
                    select: 'login userName userSurname position'
                },{
                    path: 'tags',
                    model: 'Tag'
                },{
                    path: 'technologies',
                    model: 'Technologies',
                    select: 'techName techDescription techVersion'
                }]);

            var queryCount = Projects.find(projQueryObj).count();

            async.parallel({
                projList: 	function(cbk){
                    query.exec(cbk);
                },
                matchProj:  function(cbk){
                    queryCount.exec(cbk);
                }

            }, (err, result)=>{
                searchReturn.found = result.matchProj;
                searchReturn.sortedProjList = result.projList;
                callback(null, searchReturn);
            });




        });
    }
}

const searchService = new SearchService();
//export default searchService;
module.exports = searchService;