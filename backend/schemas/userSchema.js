var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    avatar: String,
    rights: [String],
    position: String,
    userHistory: [{
        projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
        dateFrom: {type: Date},
        dateTo: {type: Date},
    }]
});

module.exports = mongoose.model('User', userSchema); 