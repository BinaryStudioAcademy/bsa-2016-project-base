"use strict";

var Users = require('../schemas/userSchema');
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');
var Projects = require('../schemas/projectSchema');
var {ObjectId} = require('mongodb');
//var mongoose = require('mongoose');

class SearchServiceSubTools {

	getSearchFiltersFromRequest(req) {
        console.log('getSearchFiltersFromRequest() aquired request string: ', req.url);
        let queryFilters = {};
        queryFilters.queryProjIds = (req.query.id == undefined)? []: req.query.id.split(',').map(elem=> new ObjectId(elem)); 
        //queryFilters.queryProjIds = (req.query.id == undefined)? []: req.query.id.split(',').map(elem=> mongoose.Types.ObjectId(elem)); 
        queryFilters.queryProjNames = (req.query.name == undefined)? []: req.query.name.split(',');     
        queryFilters.queryProjUsers = (req.query.users == undefined)? []: req.query.users.split(',');
        queryFilters.queryProjOwners = (req.query.owners == undefined)? []: req.query.owners.split(',');
        queryFilters.queryProjTags = (req.query.tags == undefined)? []: req.query.tags.split(',');
        queryFilters.queryProjTechs = (req.query.techs == undefined)? []: req.query.techs.split(',');
        queryFilters.queryProjSkip = (req.query.skip == undefined)? 0: Number.parseInt(req.query.skip);
        queryFilters.queryProjLimit = (req.query.limit == undefined)? Number.MAX_SAFE_INTEGER: Number.parseInt(req.query.limit);
        queryFilters.queryProjDescription = (req.query.description == undefined)? '': req.query.description;

        queryFilters.queryProjDates = this.transformateDates(req.query.dateFrom, req.query.dateTo);

        console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryFilters.queryProjNames}, users = ${queryFilters.queryProjUsers},
            owners = ${queryFilters.queryProjOwners}, tags = ${queryFilters.queryProjTags}, techs = ${queryFilters.queryProjTechs}, dateFrom = ${queryFilters.queryProjDateFrom},
            dateTo = ${queryFilters.queryProjDateTo}, skip = ${queryFilters.queryProjSkip}, limit = ${queryFilters.queryProjLimit}, description = ${queryFilters.queryProjDescription}`);

        queryFilters.queryProjPredicate = (req.query.predicate == undefined)? null: req.query.predicate;

        return queryFilters;
    }

    transformateDates(datesFrom, datesTo){

        let now = new Date();
        let timeOffset = now.getTimezoneOffset();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);
       
        let fromArr = (datesFrom == undefined)? [new Date(0)] : datesFrom.split(',').map(elem=>new Date(new Date(elem).valueOf() - timeOffset));
        let toArr = (datesTo == undefined)? [now]: datesTo.split(',').map(elem=>new Date(new Date(elem).valueOf() + 86399999));
        
        let datesObj = [];
        for (let i = 0; i < Math.max(fromArr.length, toArr.length); i++){
            datesObj[i] = {dateFrom: fromArr[i] || new Date(0), dateTo: toArr[i] || now};
        }
        console.log(`Dates obj: ${datesObj}`);
        return datesObj;
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

    getStrictUsersIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){

            let selectedUsersId = [];
           
            let namesPatterns =  queryArr.map(elem=>{return {fullName: elem}});
            // console.log(surNames);
            // console.log(fullNames);
            console.log('namesPatterns: ', namesPatterns);

            let queryUsers = Users.aggregate([
                { $project : { _id: 1, userName: 1, userSurname: 1, fullName: {$concat: ['$userName', ' ', '$userSurname']}}},
                { $match: {$or: namesPatterns}}
            ]);

            queryUsers.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                //console.log(result);
                try {
                    queryArr.forEach((elem, ind, arr)=>{
                        selectedUsersId.push(result.find(elem_=> elem_.fullName == elem)._id);
                    });
                } catch (err){
                    console.log('getStrictUsersIdFromSearchQuery() - Uncorrect parameters acquired from query.');
                    callback(err, null);
                }
                //console.log('selectedUsersId: ', selectedUsersId);
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

    getStrictOwnersIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){
            let selectedOwnersId = [];

            let namesPatterns =  queryArr.map(elem=>{return {fullName: {$regex: elem, $options:'$i'}}});
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
                try {
                    queryArr.forEach((elem, ind, arr)=>{
                        selectedOwnersId.push(result.find(elem_=> elem_.fullName == elem)._id);
                    });
                } catch (err){
                    console.log('getStrictOwnersIdFromSearchQuery() - Uncorrect parameters acquired from query.');
                    callback(err, null);
                }
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

    getStrictTagsIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){
            let selectedTagsId = [];

            let queryTags = Tags.aggregate([
                { $project : { _id: 1, tagName: 1}},
                { $match: { tagName: {$in: queryArr}}}
            ]);

            queryTags.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                //console.log(result);
                try{
                    queryArr.forEach((elem, ind, arr)=>{
                        selectedTagsId.push(result.find(elem_=> elem_.tagName == elem)._id);
                    });
                } catch (err){
                    console.log('getStrictTagsIdFromSearchQuery() - Uncorrect parameters acquired from query.');
                    callback(err, null);
                }
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

    getStrictTechsIdFromSearchQuery(queryArr, callback){

        if (queryArr.length > 0){
            let selectedTechsId = [];
                     
            let queryTechs = Techs.aggregate([
                { $project : { _id: 1, techName: 1}},
                { $match: { techName: {$in: queryArr}}}
            ]);

            queryTechs.exec((err, result)=>{
                if (err) {
                    console.log('Error');
                }
                //console.log('getStrictTechsIdFromSearchQuery() -> result: ', result);
                try {
                    queryArr.forEach((elem, ind, arr)=>{
                        console.log('Techs find: ', result.find(elem_=> elem_.techName == elem));
                        selectedTechsId.push(result.find(elem_=> elem_.techName == elem)._id);
                    });
                } catch (err){
                    console.log('getStrictTechsIdFromSearchQuery() - Uncorrect parameters acquired from query.');
                    callback(err, null);
                }
                console.log('getStrictTechsIdFromSearchQuery -> selectedTechsId: ', selectedTechsId);
                callback(null, selectedTechsId);
            });
        } else {callback(null, null)}
    }

    prepareMainQuery(searchReturn, searchFilters, res){
        let queriesArr = [];
        let projQueryObj = null;

        if (searchFilters.queryProjPredicate){
            
            let preparedQueryConditions = this.preparedQueryConditions(searchReturn, res);

            projQueryObj = {
                $and: [
                    {$or: [
                        {'description.descrText': {$regex: searchFilters.queryProjDescription, $options:'$i'}},
                        {'description.descrFullText': {$regex: searchFilters.queryProjDescription, $options:'$i'}}
                    ]}
                ]
            };

            if (preparedQueryConditions!= null) {
                projQueryObj.$and.push({$or: preparedQueryConditions});
            };
            console.log('projQueryObj: ', projQueryObj);
           
        } else {
            
            let datesQuerySelection = [];
            //console.log('Simple search, query dates: ', searchFilters.queryProjDates);
            searchFilters.queryProjDates.forEach(elem=>{
                datesQuerySelection.push(
                    {$and: [{timeBegin: {$lte: elem.dateFrom}}, {timeEnd: {$gte: elem.dateFrom}}, {status: 'Completed'}]},
                    {$and: [{timeBegin: {$gte: elem.dateFrom}}, {timeBegin: {$lte: elem.dateTo}}, {status: 'Completed'}]},
                    {$and: [{timeBegin: {$lte: elem.dateTo}}, {status: {$ne: 'Completed'}}]}
                );
            });

            let namesQuerySelection =[];
            searchFilters.queryProjNames.forEach((elem) =>{
                namesQuerySelection.push({projectName: {$regex: elem, $options:'$i'}});
            });
            
            projQueryObj = {
                $and: [
                    {$or: [
                        {'description.descrText': {$regex: searchFilters.queryProjDescription, $options:'$i'}},
                        {'description.descrFullText': {$regex: searchFilters.queryProjDescription, $options:'$i'}}
                    ]},
                    {$or: datesQuerySelection}
                ]
            };

            if (searchFilters.queryProjIds.length != 0) {projQueryObj._id = {$in: searchFilters.queryProjIds}};
            if (namesQuerySelection.length != 0){projQueryObj.$and.push({$or: namesQuerySelection})};
            if (res.filteredUsersIds != null) {projQueryObj.users = {$in: res.filteredUsersIds}};
            if (res.filteredOwnersIds != null) {projQueryObj.owners = {$in: res.filteredOwnersIds}};
            if (res.filteredTagsIds != null) {projQueryObj.tags = {$in: res.filteredTagsIds}};
            if (res.filteredTechsIds!= null) {projQueryObj.technologies = {$in: res.filteredTechsIds}};
        }
        console.log('projQueryObj', projQueryObj);
        queriesArr[0] = Projects.find(projQueryObj, 
                                        {features: 0, questions: 0, attachments: 0},
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
        queriesArr[1] = Projects.find(projQueryObj).count();
        return queriesArr;
    }

    preparedQueryConditions(searchReturn, selectedIds){
        let selectionConditionsOr = [];
        searchReturn.queryCompiledPredicate.result.forEach((elem, ind, arr)=>{
            //console.log('Object.keys(elem.vars): ', Object.keys(elem.vars));
            console.log('Object.values(elem.vars): ', elem.vars);
            
            let selectionsConditionsAnd = {
                idsIn: [],
                idsNin: [],
                namesIn: [],
                namesNin: [],
                usersIn: [],
                usersNin: [],
                ownersIn: [],
                ownersNin: [],
                tagsIn: [],
                tagsNin: [],
                techsIn: [],
                techsNin: [],
                datesIn: [],
                datesNin: []
            };

            let regexp = /(\w+)(\d+)/i;
            Object.keys(elem.vars).forEach((elem_, ind_, arr_)=>{
                console.log('vars.elem_', elem_);
                let keyParts = elem_.match(regexp);
                console.log('keyParts: ', keyParts);
                switch (keyParts[1]){
                    case 'user': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.usersIn.push(selectedIds.filteredUsersIds[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.usersNin.push(selectedIds.filteredUsersIds[parseInt(keyParts[2])])};
                                break;
                    case 'owner': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.ownersIn.push(selectedIds.filteredOwnersIds[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.ownersNin.push(selectedIds.filteredOwnersIds[parseInt(keyParts[2])])};
                                break;
                    case 'tag': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.tagsIn.push(selectedIds.filteredTagsIds[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.tagsNin.push(selectedIds.filteredTagsIds[parseInt(keyParts[2])])};
                                break;
                    case 'tech': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.techsIn.push(selectedIds.filteredTechsIds[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.techsNin.push(selectedIds.filteredTechsIds[parseInt(keyParts[2])])};
                                break;
                    case 'date': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.datesIn.push({from: searchReturn.queryDates[parseInt(keyParts[2])].dateFrom, to: searchReturn.queryDates[parseInt(keyParts[2])].dateTo})}
                                else {selectionsConditionsAnd.datesNin.push({from: searchReturn.queryDates[parseInt(keyParts[2])].dateFrom, to: searchReturn.queryDates[parseInt(keyParts[2])].dateTo})};
                                break;
                    case 'name': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.namesIn.push(searchReturn.queryProjNames[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.techsNin.push(searchReturn.queryProjNames[parseInt(keyParts[2])])};
                                break;
                    case 'location':   if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.idsIn.push(searchReturn.queryIds[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.idsNin.push(searchReturn.queryIds[parseInt(keyParts[2])])};
                                break;
                    default: throw new Error('Error in predicates selection: predicate was not recognized.');
                }
            });

            console.log('selectionsConditionsAnd', selectionsConditionsAnd);
            let outputAnd = {
                $and: []
            }
            if (selectionsConditionsAnd.idsIn.length != 0) outputAnd.$and.push({_id: {$in: selectionsConditionsAnd.idsIn}});
            if (selectionsConditionsAnd.idsNin.length != 0) outputAnd.$and.push({_id: {$nin: selectionsConditionsAnd.idsNin}});
            if (selectionsConditionsAnd.usersIn.length != 0) outputAnd.$and.push({users: {$all: selectionsConditionsAnd.usersIn}});
            if (selectionsConditionsAnd.usersNin.length != 0) outputAnd.$and.push({users: {$nin: selectionsConditionsAnd.usersNin}});
            if (selectionsConditionsAnd.ownersIn.length != 0) outputAnd.$and.push({owners: {$all: selectionsConditionsAnd.ownersIn}});
            if (selectionsConditionsAnd.ownersNin.length != 0) outputAnd.$and.push({owners: {$nin: selectionsConditionsAnd.ownersNin}});
            if (selectionsConditionsAnd.tagsIn.length != 0) outputAnd.$and.push({tags: {$all: selectionsConditionsAnd.tagsIn}});
            if (selectionsConditionsAnd.tagsNin.length != 0) outputAnd.$and.push({tags: {$nin: selectionsConditionsAnd.tagsNin}});
            if (selectionsConditionsAnd.techsIn.length != 0) outputAnd.$and.push({technologies: {$all: selectionsConditionsAnd.techsIn}});
            if (selectionsConditionsAnd.techsNin.length != 0) outputAnd.$and.push({technologies: {$nin: selectionsConditionsAnd.techsNin}});

            if (selectionsConditionsAnd.datesIn.length != 0){
                
                selectionsConditionsAnd.datesIn.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {   $or: [
                            {$and: [{timeBegin: {$lte: new Date(elem.from)}}, {timeEnd: {$gte: new Date(elem.from)}}, {status: 'Completed'}]},
                            {$and: [{timeBegin: {$gte: new Date(elem.from)}}, {timeBegin: {$lte: new Date(elem.to)}}, {status: 'Completed'}]},
                            {$and: [{timeBegin: {$lte: new Date(elem.to)}}, {status: {$ne: 'Completed'}}]}
                        ]
                    }       
                )});
            }

                selectionsConditionsAnd.datesNin.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {$or: [
                        {$and: [{timeBegin: {$lt: elem.from}}, {timeEnd: {$lt: elem.from}}]},
                        {timeBegin: {$gt: elem.to}}
                    ]}
                )});
 
                selectionsConditionsAnd.namesIn.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {
                        projectName: {$regex: elem}
                    }       
                )});

                selectionsConditionsAnd.namesNin.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {
                        projectName: {$not: {$regex: elem}}
                    }       
                )});

            if (outputAnd.$and.length != 0){
                selectionConditionsOr.push(outputAnd);
                console.log('outputAnd: ', outputAnd);
            } else {selectionConditionsOr = null}
            console.log('selectionConditionsOr:', selectionConditionsOr);
        
        });
        return selectionConditionsOr;
    }
}
const searchServiceSubTools = new SearchServiceSubTools();
module.exports = searchServiceSubTools;