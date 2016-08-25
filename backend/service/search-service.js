var Tags = require('../schemas/tagSchema');
var Techs = require('../schemas/technologySchema');
var Users = require('../schemas/userSchema');
var Projects = require('../schemas/projectSchema');

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
	    // console.log(`getFilteredProjects() -> acquired request params: projName= ${req.query.name}, users = ${req.query.users}, owners = ${req.query.owners}, tags = ${req.query.tags}, technologies = ${req.query.technologies}, dateFrom = ${req.query.dateFrom}, dateTo = ${req.query.dateTo}`);
	    // const queryProjName = req.query.name;
	    const queryProjName = (req.query.name == undefined)? '': '^'.concat(req.query.name);
	    const queryProjUsers = (req.query.users == undefined)? []: req.query.users.split(',');
	    const queryProjOwners = (req.query.owners == undefined)? []: req.query.owners.split(',');
	    const queryProjTags = (req.query.tags == undefined)? []: req.query.tags.split(',');
	    const queryProjTechs = (req.query.techs == undefined)? []: req.query.techs.split(',');
	    const queryProjSkip = (req.query.skip == undefined)? 0: Number.parseInt(req.query.skip);
	    const queryProjLimit = (req.query.limit == undefined)? Number.MAX_SAFE_INTEGER: Number.parseInt(req.query.limit);

	    var now = new Date();
	    var timeOffset = now.getTimezoneOffset();
	    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);
	    const queryProjDateFrom = (req.query.dateFrom == undefined)? new Date(0): new Date(new Date(req.query.dateFrom).valueOf() + 86399999);
	    const queryProjDateTo = (req.query.dateTo == undefined)? now: new Date(new Date(req.query.dateTo).valueOf() + 86399999);
	    console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryProjName}, users = ${queryProjUsers}, owners = ${queryProjOwners}, tags = ${queryProjTags}, techs = ${queryProjTechs}, dateFrom = ${queryProjDateFrom}, dateTo = ${queryProjDateTo}, skip = ${queryProjSkip}, limit = ${queryProjLimit}`);

	    var searchReturn = {
	    	queryName: queryProjName,
	    	queryUsers: queryProjUsers,
	    	queryOwners: queryProjOwners,
	    	queryTags: queryProjTags,
	    	queryTechs: queryProjTechs,
	    	querySkip: queryProjSkip,
	    	queryLimit: queryProjLimit,
	    	sortedProjList: [],
	    	found: 0
	    };

	    var query = Projects.find({
	                    projectName: {$regex: queryProjName, $options:"$i"}
	                }, {features: 0, questions: 0, screenShots: 0})
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
	                },{
	                    path: 'stage',
	                    model: 'Stage'
	                },{
	                    path: 'condition',
	                    model: 'Condition'
	                }]);
	                
	    query.exec((err, result)=>{
	        let passedProject = true;
	        let projCounter = 1;
	        let limitCounter = 0;
	        // console.log('query exec() -> result length: ', result.length);
	        // console.log('Query result: ', result);
	        result.forEach((entryProj, indProj, arrProj)=>{
	           	passedProject = true;
	            //console.log('Users from query: ', entryProj.users);
	            // console.log('queryProjUsers: ', queryProjUsers);
	            // console.log('queryProjOwners: ', queryProjOwners);
	            // console.log('queryProjTags: ', queryProjTags);
	            // console.log('queryProjTechs: ', queryProjTechs);
	            // console.log('queryProjDateFrom: ', queryProjDateFrom);
	            // console.log('queryProjDateTo: ', queryProjDateTo);

	            if (queryProjUsers.length > 0) {
	                //console.log('Inside users selection.');
	                passedProject = false;
	                queryProjUsers.some((entryUser)=>{
	                	// console.log('entryUser: ', entryUser);
	                	let userNameParts = entryUser.split(' ');
	                	// console.log('userNameParts: ', userNameParts);
	                	// console.log('userNameParts length: ', userNameParts.length);
	                	if (userNameParts.length == 1){
	                		for (var count = 0; count < entryProj.users.length; count++) {
		                        if (entryProj.users[count].userSurname == userNameParts[0]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	} else {
	                		for (var count = 0; count < entryProj.users.length; count++) {
		                        if (entryProj.users[count].userName == userNameParts[0] 
		                        	&& entryProj.users[count].userSurname == userNameParts[1]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	}
	                    return passedProject;
	                });  
	            }

	            if (queryProjOwners.length > 0 && passedProject) {
	                //console.log('Inside owners selection.');
	                passedProject = false;
	                queryProjOwners.some((entryOwner)=>{
	                	// console.log('entryOwner: ', entryOwner);
	                	let ownerNameParts = entryOwner.split(' ');
	                	// console.log('ownerNameParts: ', ownerNameParts);
	                	// console.log('ownerNameParts length: ', ownerNameParts.length);
	                    if (ownerNameParts.length == 1){
	                		for (var count = 0; count < entryProj.owners.length; count++) {
		                        if (entryProj.owners[count].userSurname == ownerNameParts[0]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	} else {
	                		for (var count = 0; count < entryProj.owners.length; count++) {
		                        if (entryProj.owners[count].userName == ownerNameParts[0] 
		                        	&& entryProj.owners[count].userSurname == ownerNameParts[1]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	}
	                    return passedProject;
	                });  
	            }

	            if (queryProjTags.length > 0 && passedProject) {
	                //console.log('Inside tags selection.');
	                passedProject = false;
	                queryProjTags.some((entryTag)=>{
	                    for (var count = 0; count < entryProj.tags.length; count++) {
	                        if (entryProj.tags[count].tagName == entryTag) {
	                            passedProject = true;
	                            break;
	                        }
	                    }
	                    return passedProject;
	                });  
	            }

	            if (queryProjTechs.length > 0 && passedProject) {
	                //console.log('Inside technologies selection.');
	                //console.log('Technologies: ', entryProj.technologies);
	                passedProject = false;
	                queryProjTechs.some((entryTechn)=>{
	                    for (var count = 0; count < entryProj.technologies.length; count++) {
	                        //console.log('entryTechn: ', entryTechn);
	                        //console.log('entryProj.technologies[count].techName: ', entryProj.technologies[count].techName);
	                        if (entryProj.technologies[count].techName == entryTechn) {
	                            passedProject = true;
	                            break;
	                        }
	                    }
	                    return passedProject;
	                });  
	            }

	            if (passedProject) {
	                // console.log('Inside Dates selection.');
	                // console.log('Selection: Query Date from: ', queryProjDateFrom);
	                // console.log('Selection: Query Date to: ', queryProjDateTo);
	                // console.log('Selection: Proj Date From: ', entryProj.timeBegin);
	                // console.log('Selection: Proj Date To: ', entryProj.timeEnd);

	                passedProject = false;
	                if (!entryProj.isCompleted) {entryProj.timeEnd = now;}
	                
	                if (entryProj.timeBegin >= queryProjDateFrom) {
	                    if (entryProj.timeBegin <= queryProjDateTo) {
	                        passedProject = true;
	                    }
	                } else if (entryProj.timeEnd >= queryProjDateFrom && entryProj.timeEnd <= queryProjDateTo) {
	                    passedProject = true;
	                } 
	            }
	            if (passedProject) {
					searchReturn.found++;
					if (projCounter > queryProjSkip && limitCounter < queryProjLimit){
	                	searchReturn.sortedProjList.push(entryProj);
	                	//searchReturn.found++;
	                	limitCounter++;
			        }
			        projCounter++;
	            }
	        });

	        callback(err, searchReturn);
	        // callback(err, result);
	     });
	}

	getFilteredProjects2(req, callback) {
	    // console.log(`getFilteredProjects() -> acquired request params: projName= ${req.query.name}, users = ${req.query.users}, owners = ${req.query.owners}, tags = ${req.query.tags}, technologies = ${req.query.technologies}, dateFrom = ${req.query.dateFrom}, dateTo = ${req.query.dateTo}`);
	    // const queryProjName = req.query.name;
	    const queryProjName = (req.query.name == undefined)? '': '^'.concat(req.query.name);
	    const queryProjUsers = (req.query.users == undefined)? []: req.query.users.split(',');
	    const queryProjOwners = (req.query.owners == undefined)? []: req.query.owners.split(',');
	    const queryProjTags = (req.query.tags == undefined)? []: req.query.tags.split(',');
	    const queryProjTechs = (req.query.techs == undefined)? []: req.query.techs.split(',');
	    const queryProjSkip = (req.query.skip == undefined)? 0: Number.parseInt(req.query.skip);
	    const queryProjLimit = (req.query.limit == undefined)? Number.MAX_SAFE_INTEGER: Number.parseInt(req.query.limit);

	    var now = new Date();
	    var timeOffset = now.getTimezoneOffset();
	    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);
	    const queryProjDateFrom = (req.query.dateFrom == undefined)? new Date(0): new Date(new Date(req.query.dateFrom).valueOf() + 86399999);
	    const queryProjDateTo = (req.query.dateTo == undefined)? now: new Date(new Date(req.query.dateTo).valueOf() + 86399999);
	    console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryProjName}, users = ${queryProjUsers}, owners = ${queryProjOwners}, tags = ${queryProjTags}, techs = ${queryProjTechs}, dateFrom = ${queryProjDateFrom}, dateTo = ${queryProjDateTo}, skip = ${queryProjSkip}, limit = ${queryProjLimit}`);

	    var searchReturn = {
	    	queryName: queryProjName,
	    	queryUsers: queryProjUsers,
	    	queryOwners: queryProjOwners,
	    	queryTags: queryProjTags,
	    	queryTechs: queryProjTechs,
	    	querySkip: queryProjSkip,
	    	queryLimit: queryProjLimit,
	    	sortedProjList: [],
	    	found: 0
	    };

	    var query = Projects.find({
	                    projectName: {$regex: queryProjName, $options:"$i"}
	                }, {features: 0, questions: 0, screenShots: 0})
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
	                },{
	                    path: 'stage',
	                    model: 'Stage'
	                },{
	                    path: 'condition',
	                    model: 'Condition'
	                }]);
	                
	    query.exec((err, result)=>{
	        let passedProject = true;
	        let projCounter = 1;
	        let limitCounter = 0;
	        // console.log('query exec() -> result length: ', result.length);
	        // console.log('Query result: ', result);
	        result.forEach((entryProj, indProj, arrProj)=>{
	           	passedProject = true;
	            //console.log('Users from query: ', entryProj.users);
	            // console.log('queryProjUsers: ', queryProjUsers);
	            // console.log('queryProjOwners: ', queryProjOwners);
	            // console.log('queryProjTags: ', queryProjTags);
	            // console.log('queryProjTechs: ', queryProjTechs);
	            // console.log('queryProjDateFrom: ', queryProjDateFrom);
	            // console.log('queryProjDateTo: ', queryProjDateTo);

	            if (queryProjUsers.length > 0) {
	                //console.log('Inside users selection.');
	                passedProject = false;
	                queryProjUsers.some((entryUser)=>{
	                	// console.log('entryUser: ', entryUser);
	                	let userNameParts = entryUser.split(' ');
	                	// console.log('userNameParts: ', userNameParts);
	                	// console.log('userNameParts length: ', userNameParts.length);
	                	if (userNameParts.length == 1){
	                		for (var count = 0; count < entryProj.users.length; count++) {
		                        if (entryProj.users[count].userSurname == userNameParts[0]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	} else {
	                		for (var count = 0; count < entryProj.users.length; count++) {
		                        if (entryProj.users[count].userName == userNameParts[0] 
		                        	&& entryProj.users[count].userSurname == userNameParts[1]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	}
	                    return passedProject;
	                });  
	            }

	            if (queryProjOwners.length > 0 && passedProject) {
	                //console.log('Inside owners selection.');
	                passedProject = false;
	                queryProjOwners.some((entryOwner)=>{
	                	// console.log('entryOwner: ', entryOwner);
	                	let ownerNameParts = entryOwner.split(' ');
	                	// console.log('ownerNameParts: ', ownerNameParts);
	                	// console.log('ownerNameParts length: ', ownerNameParts.length);
	                    if (ownerNameParts.length == 1){
	                		for (var count = 0; count < entryProj.owners.length; count++) {
		                        if (entryProj.owners[count].userSurname == ownerNameParts[0]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	} else {
	                		for (var count = 0; count < entryProj.owners.length; count++) {
		                        if (entryProj.owners[count].userName == ownerNameParts[0] 
		                        	&& entryProj.owners[count].userSurname == ownerNameParts[1]) {
		                            passedProject = true;
		                            break;
		                        }
	                    	}
	                	}
	                    return passedProject;
	                });  
	            }

	            if (queryProjTags.length > 0 && passedProject) {
	                //console.log('Inside tags selection.');
	                passedProject = false;
	                queryProjTags.some((entryTag)=>{
	                    for (var count = 0; count < entryProj.tags.length; count++) {
	                        if (entryProj.tags[count].tagName == entryTag) {
	                            passedProject = true;
	                            break;
	                        }
	                    }
	                    return passedProject;
	                });  
	            }

	            if (queryProjTechs.length > 0 && passedProject) {
	                //console.log('Inside technologies selection.');
	                //console.log('Technologies: ', entryProj.technologies);
	                passedProject = false;
	                queryProjTechs.some((entryTechn)=>{
	                    for (var count = 0; count < entryProj.technologies.length; count++) {
	                        //console.log('entryTechn: ', entryTechn);
	                        //console.log('entryProj.technologies[count].techName: ', entryProj.technologies[count].techName);
	                        if (entryProj.technologies[count].techName == entryTechn) {
	                            passedProject = true;
	                            break;
	                        }
	                    }
	                    return passedProject;
	                });  
	            }

	            if (passedProject) {
	                // console.log('Inside Dates selection.');
	                // console.log('Selection: Query Date from: ', queryProjDateFrom);
	                // console.log('Selection: Query Date to: ', queryProjDateTo);
	                // console.log('Selection: Proj Date From: ', entryProj.timeBegin);
	                // console.log('Selection: Proj Date To: ', entryProj.timeEnd);

	                passedProject = false;
	                if (!entryProj.isCompleted) {entryProj.timeEnd = now;}
	                
	                if (entryProj.timeBegin >= queryProjDateFrom) {
	                    if (entryProj.timeBegin <= queryProjDateTo) {
	                        passedProject = true;
	                    }
	                } else if (entryProj.timeEnd >= queryProjDateFrom && entryProj.timeEnd <= queryProjDateTo) {
	                    passedProject = true;
	                } 
	            }
	            if (passedProject) {
					searchReturn.found++;
					if (projCounter > queryProjSkip && limitCounter < queryProjLimit){
	                	searchReturn.sortedProjList.push(entryProj);
	                	//searchReturn.found++;
	                	limitCounter++;
			        }
			        projCounter++;
	            }
	        });

	        callback(err, searchReturn);
	        // callback(err, result);
	     });
	}
}

const searchService = new SearchService();
//export default searchService;
module.exports = searchService;