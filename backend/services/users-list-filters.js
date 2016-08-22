var Users = require('../schemas/userSchema');


module.exports = function(req, callback) {
    console.log(`getFilteredUsers() -> acquired request params: user = ${req.query.user}`);
    const queryUser = (req.query.user == undefined)? '': '^'.concat(req.query.user);

    var query = Users.find({
                    userName: {$regex: queryUser, $options:"$i"}
                });

    query.exec(callback);
}
