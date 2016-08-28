var Users = require('../schemas/userSchema');
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');

class SearchServiceSubTools {

	getSearchFiltersFromRequest(req) {
        
        let queryFilters = {};
        queryFilters.queryProjName = (req.query.name == undefined)? '': req.query.name;
        // queryFilters.queryProjName = (req.query.name == undefined)? '': '^'.concat(req.query.name);        
        queryFilters.queryProjUsers = (req.query.users == undefined)? []: req.query.users.split(',');
        queryFilters.queryProjOwners = (req.query.owners == undefined)? []: req.query.owners.split(',');
        queryFilters.queryProjTags = (req.query.tags == undefined)? []: req.query.tags.split(',');
        queryFilters.queryProjTechs = (req.query.techs == undefined)? []: req.query.techs.split(',');
        queryFilters.queryProjSkip = (req.query.skip == undefined)? 0: Number.parseInt(req.query.skip);
        queryFilters.queryProjLimit = (req.query.limit == undefined)? Number.MAX_SAFE_INTEGER: Number.parseInt(req.query.limit);

        var now = new Date();
        var timeOffset = now.getTimezoneOffset();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);
        queryFilters.queryProjDateFrom = (req.query.dateFrom == undefined)? [new Date(0)]: req.query.dateFrom.split(',').map(elem=>new Date(new Date(elem).valueOf() - timeOffset));      
        queryFilters.queryProjDateTo = (req.query.dateTo == undefined)? [now]: req.query.dateTo.split(',').map(elem=>new Date(new Date(elem).valueOf() + 86399999));
        console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryFilters.queryProjName}, users = ${queryFilters.queryProjUsers},
            owners = ${queryFilters.queryProjOwners}, tags = ${queryFilters.queryProjTags}, techs = ${queryFilters.queryProjTechs}, dateFrom = ${queryFilters.queryProjDateFrom},
            dateTo = ${queryFilters.queryProjDateTo}, skip = ${queryFilters.queryProjSkip}, limit = ${queryFilters.queryProjLimit}`);

        return queryFilters;
    }

	getUsersIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){

            let selectedUsersId = [];
            let namesOrSurNames = queryArr.filter((elem)=>{
                return (elem.split(' ').length == 1)? true: false;
            });
            let fullNames = queryArr.filter((elem)=>{
                return (elem.split(' ').length == 2)? true: false;
            });

            let namesPatterns =  namesOrSurNames.map(elem=>{
                                    return {userSurname: {$regex: elem, $options:'$i'}};
                                }).concat(namesOrSurNames.map(elem=>{
                                    return {userName: {$regex: elem, $options:'$i'}};
                                })).concat(fullNames.map(elem=>{
                                    return {fullName: {$regex: elem, $options:'$i'}};
                                }));
            // console.log(surNames);
            // console.log(fullNames);

            let queryUsers = Users.aggregate([
                { $project : { _id: 1, userName: 1, userSurname: 1, fullName: {$concat: ['$userName', ' ', '$userSurname']}}},
                { $match: {$or: namesPatterns}}
            ]);

            queryUsers.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                //console.log(result);
                selectedUsersId = result.map((elem)=> {return elem._id});
                callback(null, selectedUsersId);
            });
        } else {callback(null, null)}
    }


    getOwnersIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){
            let selectedOwnersId = [];

            let surNames = queryArr.filter((elem)=>{
                return (elem.split(' ').length == 1)? true: false;
            });

            let fullNames = queryArr.filter((elem)=>{
                return (elem.split(' ').length == 2)? true: false;
            });

            let namesPatterns =  surNames.map(elem=>{
                                    return {userSurname: {$regex: elem, $options:'$i'}};
                                }).concat(surNames.map(elem=>{
                                    return {userName: {$regex: elem, $options:'$i'}};
                                })).concat(fullNames.map(elem=>{
                                    return {fullName: {$regex: elem, $options:'$i'}};
                                }));
            // console.log(surNames);
            // console.log(fullNames);

            let queryOwners = Users.aggregate([
                { $project : { _id: 1, userName: 1, userSurname: 1, fullName: {$concat: ['$userName', ' ', '$userSurname']}}},
                { $match: {$or: namesPatterns}}
            ]);

            queryOwners.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                //console.log(result);
                selectedOwnersId = result.map((elem)=> {return elem._id});
                callback(null, selectedOwnersId);
            });
        } else {callback(null, null)}
    }

    getTagsIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){
            let selectedTagsId = [];

            let tagsPatterns =  queryArr.map(elem=>{
                                    return {tagName: {$regex: elem, $options:'$i'}};
                                });
            let queryTags = Tags.aggregate([
                { $project : { _id: 1, tagName: 1}},
                { $match: { $or: tagsPatterns }}
            ]);

            queryTags.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                //console.log(result);
                selectedTagsId = result.map((elem)=> {return elem._id});
                callback(null, selectedTagsId);
            });
        } else {callback(null, null)}
    }

    getTechsIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){
            let selectedTechsId = [];

            let techPatterns =  queryArr.map(elem=>{
                                    return {techName: {$regex: elem, $options:'$i'}};
                                });
                        
            let queryTechs = Techs.aggregate([
                { $project : { _id: 1, techName: 1}},
                { $match: { $or: techPatterns }}
            ]);

            queryTechs.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                console.log(result);
                selectedTechsId = result.map((elem)=> {return elem._id});
                callback(null, selectedTechsId);
            });
        } else {callback(null, null)}
    }
}
const searchServiceSubTools = new SearchServiceSubTools();
module.exports = searchServiceSubTools;