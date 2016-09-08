var Projects = require('../schemas/projectSchema');
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');


class StatService {

	getProjectsCountriesStat(req, callback){
		console.log('getProjectsCountriesStat() called.');
		
		Projects.aggregate([{"$group" : {_id:"$contacts.countryName", count:{$sum:1}}}]).exec(callback);

		//callback(null, countriesDistribution);
	}

	getProjectsTagsStat(req, callback){
		Projects.aggregate([{$unwind: "$tags"}, {$group: {_id: "$tags", count:{$sum:1}}}, {$sort: {count: -1}}])
			.exec((err, result)=>{
				Tags.populate(result, {path: '_id'}, function(err2, tagsResult){
					//console.log(tagsResult);
					let returnObj = [];
					tagsResult.forEach((tagElem, ind, arr) =>{
						returnObj.push({
							tagName: tagElem._id.tagName,
							count: tagElem.count
						});
					});
					callback(null, returnObj);
				});
			});
		
	}

	getProjectsTechsStat(req, callback){
		Projects.aggregate([{$unwind: "$technologies"}, {$group: {_id: "$technologies", count:{$sum:1}}}, {$sort: {count: -1}}])
			.exec((err, result)=>{
				Techs.populate(result, {path: '_id'}, function(err2, techsResult){
					//console.log(tagsResult);
					let returnObj = [];
					techsResult.forEach((techElem, ind, arr) =>{
						returnObj.push({
							techName: techElem._id.techName,
							count: techElem.count
						});
					});
					callback(null, returnObj);
				});
			});
		
	}
}

const statService = new StatService();
module.exports = statService;