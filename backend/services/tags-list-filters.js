var Tags = require('../schemas/tagSchema');


module.exports = function(req, callback) {
    console.log(`getFilteredTag() -> acquired request params: tag = ${req.query.tag}`);
    const queryTag = (req.query.tag == undefined)? '': '^'.concat(req.query.tag);

    var query = Tags.find({
                    tagName: {$regex: queryTag, $options:"$i"}
                });

    query.exec(callback);
}
