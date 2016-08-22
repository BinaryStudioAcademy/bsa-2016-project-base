var Techs = require('../schemas/technologySchema');


module.exports = function(req, callback) {
    console.log(`getFilteredTechs() -> acquired request params: tech = ${req.query.tech}`);
    const queryTech = (req.query.tech == undefined)? '': '^'.concat(req.query.tech);

    var query = Techs.find({
                    techName: {$regex: queryTech, $options:"$i"}
                });

    query.exec(callback);
}
