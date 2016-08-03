/**
 * Created by razor on 03.08.16.
 */
var mongoose = require('./libs/mongoose');
mongoose.set('debug',true);
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
],function (err,result) {
    mongoose.disconnect();
});

function open(callback) {
    mongoose.connection.on('open',callback);
}
function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}
function requireModels(callback) {
    require('./models/Technologies.js').User;

    async.each(Object.keys(mongoose.models),function (modelName,callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    },callback);

}
function createUsers(callback) {

    var users = [
        {
            username : "Вася",
            password : "supervasya"
        },
        {
            username : "Петя",
            password : "123"
        },
        {
            username : "admin",
            password : "thetruehero"
        }
    ];

    async.each(users,function (userData,callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    },callback);
}