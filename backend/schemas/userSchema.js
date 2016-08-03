var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    avatar: Buffer,
    rights: [String]
});

module.exports = mongoose.model('User', userSchema); 