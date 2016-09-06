"use strict";

var async = require("async");
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');
var Users = require('../schemas/userSchema');
var Projects = require('../schemas/projectSchema');
var subtools = require('./search-service-subtools.js');

var predicateCompiler = require('./search-parser/compile');

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
	    	queryIds: searchFilters.queryProjIds,
	    	queryNames: searchFilters.queryProjNames,
	    	queryUsers: searchFilters.queryProjUsers,
	    	queryOwners: searchFilters.queryProjOwners,
	    	queryTags: searchFilters.queryProjTags,
	    	queryTechs: searchFilters.queryProjTechs,
	    	queryDates: searchFilters.queryProjDates,
	    	querySkip: searchFilters.queryProjSkip,
	    	queryLimit: searchFilters.queryProjLimit,
	    	queryDescr: searchFilters.queryProjDescription,
	    	sortedProjList: [],
	    	found: 0
	    };

	    if (searchFilters.queryProjPredicate) {
	    	console.log('searchFilters.queryProjPredicate == true');
	    	let queryCompiledPredicate = predicateCompiler(searchFilters.queryProjPredicate);
	    	searchReturn.queryPredicate = searchFilters.queryProjPredicate;
	    	searchReturn.queryCompiledPredicate = queryCompiledPredicate;
	    
		    console.log('searchReturn: ', searchReturn);
			console.log('searchFilters: ', searchFilters);
			async.parallel({
		        filteredUsersIds: 	function(callback_){
		            					subtools.getStrictUsersIdFromSearchQuery(searchFilters.queryProjUsers, callback_);
		        					},
		        filteredOwnersIds:  function(callback_){
		            					subtools.getStrictOwnersIdFromSearchQuery(searchFilters.queryProjOwners, callback_);
		        					},
		        filteredTagsIds:    function(callback_){
		        						subtools.getStrictTagsIdFromSearchQuery(searchFilters.queryProjTags, callback_);
		        					},
		        filteredTechsIds:   function(callback_){
		        						subtools.getStrictTechsIdFromSearchQuery(searchFilters.queryProjTechs, callback_);	
		        					}
	    	}, function(err, res){
	    		console.log('async res: ', res);
	    		//searchReturn.selectedIds = res;

	    		var [projQuery, projCounter] = subtools.prepareMainQuery(searchReturn, searchFilters, res);

				async.parallel({
					projList: 	function(cbk){
		        					projQuery.exec(cbk);
		        				},
		        	matchProj:  function(cbk){
		        					projCounter.exec(cbk);
		        				}

				}, (err, result)=>{
					searchReturn.found = result.matchProj;
					console.log('matchProj with predicates: ', result.matchProj);
					searchReturn.sortedProjList = result.projList;
					callback(null, searchReturn);
				});
	    	});
		} else {
			console.log('searchFilters.queryProjPredicate == false');
			console.log('searchReturn: ', searchReturn);
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

	    		console.log('async res: ', res);
	    		//searchReturn.selectedIds = res;

	    		var [projQuery, projCounter] = subtools.prepareMainQuery(searchReturn, searchFilters, res);

				async.parallel({
					projList: 	function(cbk){
		        					projQuery.exec(cbk);
		        				},
		        	matchProj:  function(cbk){
		        					projCounter.exec(cbk);
		        				}

				}, (err, result)=>{
					searchReturn.found = result.matchProj;
					searchReturn.sortedProjList = result.projList;
					callback(null, searchReturn);
				});
	    	});
		}
	}
}

const searchService = new SearchService();
//export default searchService;
module.exports = searchService;