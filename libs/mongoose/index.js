/**
 * Created by razorka on 25.07.16.
 */
var mongoose = require('mongoose');
var config =  require('../../config/');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));

module.exports = mongoose;