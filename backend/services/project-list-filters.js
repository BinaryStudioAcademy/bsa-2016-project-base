
var Project = require('../schemas/projectSchema');


module.exports = function(req, callback) {
    // console.log(`getFilteredProjects() -> acquired request params: projName= ${req.query.name}, users = ${req.query.users}, owners = ${req.query.owners}, tags = ${req.query.tags}, technologies = ${req.query.technologies}, dateFrom = ${req.query.dateFrom}, dateTo = ${req.query.dateTo}`);
    // const queryProjName = req.query.name;
    const queryProjName = (req.query.name == undefined)? '': '^'.concat(req.query.name);
    const queryProjUsers = (req.query.users == undefined)? '': req.query.users;
    const queryProjOwners = (req.query.owners == undefined)? '': req.query.owners;
    const queryProjTags = (req.query.tags == undefined)? '': req.query.tags;
    const queryProjTechs = (req.query.technologies == undefined)? '': req.query.technologies;
    const queryProjDateFrom = (req.query.dateFrom == undefined)? '': new Date(req.query.dateFrom);
    const queryProjDateTo = (req.query.dateTo == undefined)? '': new Date(req.query.dateTo);
    console.log(`getFilteredProjects() -> acquired request patterns: projName= ${queryProjName}, users = ${queryProjUsers}, owners = ${queryProjOwners}, tags = ${queryProjTags}, technologies = ${queryProjTechs}, dateFrom = ${queryProjDateFrom}, dateTo = ${queryProjDateTo}`);


    var model = Project;
        
    var query = model.find({
                    projectName: {$regex: queryProjName, $options:"$i"}
                });      
                
    query.exec(callback);
    
}
