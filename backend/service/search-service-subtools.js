

class SearchServiceSubTools {

	getSearchFiltersFromRequest(req) {
		
		let queryFilters = {};

	    queryFilters.queryProjName = (req.query.name == undefined)? '': '^'.concat(req.query.name);
	    queryFilters.queryProjUsers = (req.query.users == undefined)? []: req.query.users.split(',');
	    queryFilters.queryProjOwners = (req.query.owners == undefined)? []: req.query.owners.split(',');
	    queryFilters.queryProjTags = (req.query.tags == undefined)? []: req.query.tags.split(',');
	    queryFilters.queryProjTechs = (req.query.techs == undefined)? []: req.query.techs.split(',');
	    queryFilters.queryProjSkip = (req.query.skip == undefined)? 0: Number.parseInt(req.query.skip);
	    queryFilters.queryProjLimit = (req.query.limit == undefined)? Number.MAX_SAFE_INTEGER: Number.parseInt(req.query.limit);

	    var now = new Date();
	    var timeOffset = now.getTimezoneOffset();
	    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);
	    queryFilters.queryProjDateFrom = (req.query.dateFrom == undefined)? new Date(0): new Date(new Date(req.query.dateFrom).valueOf() + 86399999);
	    queryFilters.queryProjDateTo = (req.query.dateTo == undefined)? now: new Date(new Date(req.query.dateTo).valueOf() + 86399999);
	    console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryFilters.queryProjName}, users = ${queryFilters.queryProjUsers},
	    	owners = ${queryFilters.queryProjOwners}, tags = ${queryFilters.queryProjTags}, techs = ${queryFilters.queryProjTechs}, dateFrom = ${queryFilters.queryProjDateFrom},
	    	dateTo = ${queryFilters.queryProjDateTo}, skip = ${queryFilters.queryProjSkip}, limit = ${queryFilters.queryProjLimit}`);

	    return queryFilters;
	}

	usersSearchApply(searchFilters, entryProj){

		let passedProject = true;

		if (searchFilters.queryProjUsers.length > 0) {
			//console.log('Inside users selection.');
			passedProject = false;
            searchFilters.queryProjUsers.some((entryUser)=>{
            	//console.log('entryUser: ', entryUser);
            	let userNameParts = entryUser.split(' ');
            	//console.log('userNameParts: ', userNameParts);
            	//console.log('userNameParts length: ', userNameParts.length);
            	if (userNameParts.length == 1){
            		for (var count = 0; count < entryProj.users.length; count++) {
                        if (entryProj.users[count].userSurname == userNameParts[0]) {
                        	console.log('Match found!');
                            passedProject = true;
                            break;
                        }
                	}
            	} else {
            		for (var count = 0; count < entryProj.users.length; count++) {
                        if (entryProj.users[count].userName == userNameParts[0] 
                        	&& entryProj.users[count].userSurname == userNameParts[1]) {
                        	console.log('Match found!');
                            passedProject = true;
                            break;
                        }
                	}
            	}
                return passedProject;
            });
	    }
	    return passedProject;
	}

	ownersSearchApply(searchFilters, entryProj) {
		
		let passedProject = true;

		if (searchFilters.queryProjOwners.length > 0) {
            //console.log('Inside owners selection.');
            passedProject = false;
            searchFilters.queryProjOwners.some((entryOwner)=>{
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
	    return passedProject;
	}

	tagsSearchApply(searchFilters, entryProj) {
		
		let passedProject = true;

		if (searchFilters.queryProjTags.length > 0) {
            //console.log('Inside tags selection.');
            passedProject = false;
            searchFilters.queryProjTags.some((entryTag)=>{
                for (var count = 0; count < entryProj.tags.length; count++) {
                    if (entryProj.tags[count].tagName == entryTag) {
                        passedProject = true;
                        break;
                    }
                }
                return passedProject;
            });  
        }
        return passedProject;
	}

	techsSearchApply(searchFilters, entryProj) {
		
		let passedProject = true;

		if (searchFilters.queryProjTechs.length > 0) {
            //console.log('Inside technologies selection.');
            //console.log('Technologies: ', entryProj.technologies);
            passedProject = false;
            searchFilters.queryProjTechs.some((entryTechn)=>{
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
        return passedProject;
	}

	datesSearchApply(searchFilters, entryProj){
		
		let passedProject = true;
        var now = new Date();
        var timeOffset = now.getTimezoneOffset();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 - timeOffset, 59, 999);

		if (searchFilters.queryProjDateFrom){

	        if (!entryProj.isCompleted) {entryProj.timeEnd = now;}
	        
	        if (entryProj.timeBegin >= searchFilters.queryProjDateFrom) {
	            if (entryProj.timeBegin <= searchFilters.queryProjDateTo) {
	                passedProject = true;
	            }
	        } else if (entryProj.timeEnd >= searchFilters.queryProjDateFrom
	        	       && entryProj.timeEnd <= searchFilters.queryProjDateTo) {
	            passedProject = true;
	        }
    	}
    	return passedProject;
	}


}
const searchServiceSubTools = new SearchServiceSubTools();
module.exports = searchServiceSubTools;