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
    userHistory: [
        {
            ProjectId: {type: Schema.Types.ObjectId, ref: 'Project'},
            DateFrom: {type: Date},
            DateTo: {type: Date},
        }
]
});

module.exports = mongoose.model('User', userSchema); 