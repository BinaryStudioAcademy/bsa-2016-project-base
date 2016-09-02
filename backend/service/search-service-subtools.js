"use strict";

var Users = require('../schemas/userSchema');
var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');
var Projects = require('../schemas/projectSchema');

class SearchServiceSubTools {

	getSearchFiltersFromRequest(req) {
        
        let queryFilters = {};
        queryFilters.queryProjNames = (req.query.name == undefined)? []: req.query.name.split(',');
        // queryFilters.queryProjName = (req.query.name == undefined)? '': '^'.concat(req.query.name);        
        queryFilters.queryProjUsers = (req.query.users == undefined)? []: req.query.users.split(',');
        queryFilters.queryProjOwners = (req.query.owners == undefined)? []: req.query.owners.split(',');
        queryFilters.queryProjTags = (req.query.tags == undefined)? []: req.query.tags.split(',');
        queryFilters.queryProjTechs = (req.query.techs == undefined)? []: req.query.techs.split(',');
        queryFilters.queryProjSkip = (req.query.skip == undefined)? 0: Number.parseInt(req.query.skip);
        queryFilters.queryProjLimit = (req.query.limit == undefined)? Number.MAX_SAFE_INTEGER: Number.parseInt(req.query.limit);
        queryFilters.queryProjDescription = (req.query.description == undefined)? '': req.query.description;

        var now = new Date();
        var timeOffset = now.getTimezoneOffset();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);
        queryFilters.queryProjDateFrom = (req.query.dateFrom == undefined)? [new Date(0)]: req.query.dateFrom.split(',').map(elem=>new Date(new Date(elem).valueOf() - timeOffset));      
        queryFilters.queryProjDateTo = (req.query.dateTo == undefined)? [now]: req.query.dateTo.split(',').map(elem=>new Date(new Date(elem).valueOf() + 86399999));
        console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryFilters.queryProjNames}, users = ${queryFilters.queryProjUsers},
            owners = ${queryFilters.queryProjOwners}, tags = ${queryFilters.queryProjTags}, techs = ${queryFilters.queryProjTechs}, dateFrom = ${queryFilters.queryProjDateFrom},
            dateTo = ${queryFilters.queryProjDateTo}, skip = ${queryFilters.queryProjSkip}, limit = ${queryFilters.queryProjLimit}, description = ${queryFilters.queryProjDescription}`);

        queryFilters.queryProjPredicate = (req.query.predicate == undefined)? null: req.query.predicate;

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
                console.log('getStrictTechsIdFromSearchQuery() -> result: ', result);
                selectedTechsId = result.map((elem)=> {return elem._id});
                callback(null, selectedTechsId);
            });
        } else {callback(null, null)}
    }

    prepareMainQuery(searchReturn, searchFilters, res){
        let queriesArr = [];
        let projQueryObj = null;
        // let datesQuerySelection = [];
        //     searchFilters.queryProjDateFrom.forEach((elem,ind,arr)=>{datesQuerySelection.push(
        //             {$and: [{timeBegin: {$lte: elem}}, {timeEnd: {$gte: elem}}]},
        //             {$and: [{timeBegin: {$gte: elem}}, {timeBegin: {$lte: searchFilters.queryProjDateTo[ind]}}]}
        //         )});

        if (searchFilters.queryProjPredicate){
            
            let preparedQueryConditions = this.preparedQueryConditions(searchReturn, res);

            //searchReturn.selectedConditionsOr = preparedQueryConditions;

            // projQueryObj = {
            //     projectName: {$regex: searchFilters.queryProjName, $options:'$i'},
            //     $and: [
            //         {$or: [
            //             {'description.descrText': {$regex: searchFilters.queryProjDescription, $options:'$i'}},
            //             {'description.descrFullText': {$regex: searchFilters.queryProjDescription, $options:'$i'}}
            //         ]},
            //         {$or: datesQuerySelection},
            //         {$or: preparedQueryConditions}
            //     ]
            // };
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
            
            // let datesQuerySelection = [];
            // searchFilters.queryProjDateFrom.forEach((elem,ind,arr)=>{
            //     console.log('Simple search, query dates: ', elem, searchFilters.queryProjDateTo[ind]);
            //     datesQuerySelection.push(
            //         {$and: [{timeBegin: {$lte: elem}}, {timeEnd: {$gte: elem}}]},
            //         {$and: [{timeBegin: {$gte: elem}}, {timeBegin: {$lte: searchFilters.queryProjDateTo[ind]}}]}
            //     )});

            let datesQuerySelection = [];
            console.log('Simple search, query dates: ', searchFilters.queryProjDateFrom, searchFilters.queryProjDateTo);
            datesQuerySelection.push(
                {$and: [{timeBegin: {$lte: searchFilters.queryProjDateFrom}}, {timeEnd: {$gte: searchFilters.queryProjDateFrom}}, {status: 'Completed'}]},
                {$and: [{timeBegin: {$gte: searchFilters.queryProjDateFrom}}, {timeBegin: {$lte: searchFilters.queryProjDateTo}}, {status: 'Completed'}]},
                {$and: [{timeBegin: {$lte: searchFilters.queryProjDateTo}}, {status: {$ne: 'Completed'}}]}
            );
            

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

            if (namesQuerySelection.length != 0){projQueryObj.$and.push({$or: namesQuerySelection})};
            if (res.filteredUsersIds != null) {projQueryObj.users = {$in: res.filteredUsersIds}};
            if (res.filteredOwnersIds != null) {projQueryObj.owners = {$in: res.filteredOwnersIds}};
            if (res.filteredTagsIds != null) {projQueryObj.tags = {$in: res.filteredTagsIds}};
            if (res.filteredTechsIds!= null) {projQueryObj.technologies = {$in: res.filteredTechsIds}};
        }
        console.log('projQueryObj', projQueryObj);
        queriesArr[0] = Projects.find(projQueryObj, 
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
        queriesArr[1] = Projects.find(projQueryObj).count();
        return queriesArr;
    }

    preparedQueryConditions(searchReturn, selectedIds){
        let selectionConditionsOr = [];
        searchReturn.queryCompiledPredicate.result.forEach((elem, ind, arr)=>{
            //console.log('Object.keys(elem.vars): ', Object.keys(elem.vars));
            console.log('Object.values(elem.vars): ', elem.vars);
            
            let selectionsConditionsAnd = {
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
                                    {selectionsConditionsAnd.datesIn.push({from: searchReturn.queryDateFrom[parseInt(keyParts[2])], to: searchReturn.queryDateTo[parseInt(keyParts[2])]})}
                                else {selectionsConditionsAnd.datesNin.push({from: searchReturn.queryDateFrom[parseInt(keyParts[2])], to: searchReturn.queryDateTo[parseInt(keyParts[2])]})};
                                break;
                    case 'name': if (elem.vars[elem_] == '1') 
                                    {selectionsConditionsAnd.namesIn.push(searchReturn.queryProjNames[parseInt(keyParts[2])])}
                                else {selectionsConditionsAnd.techsNin.push(searchReturn.queryProjNames[parseInt(keyParts[2])])};
                                break;
                }
            });

            console.log('selectionsConditionsAnd', selectionsConditionsAnd);
            let outputAnd = {
                $and: []
            }
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

            if (selectionsConditionsAnd.datesNin.length != 0){

                selectionsConditionsAnd.datesIn.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {$or: [
                        {$and: [{timeBegin: {$lt: elem.from}}, {timeEnd: {$lt: elem.from}}]},
                        {timeBegin: {$gt: elem.to}}
                    ]}
                )});
            }

            if (selectionsConditionsAnd.namesIn.length != 0){
                selectionsConditionsAnd.namesIn.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {
                        projectName: {$regex: elem}
                    }       
                )});
            }

            if (selectionsConditionsAnd.namesNin.length != 0){
                selectionsConditionsAnd.namesNin.forEach((elem,ind,arr)=>{outputAnd.$and.push(
                    {
                        projectName: {$not: {$regex: elem}}
                    }       
                )});
            }

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