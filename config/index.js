/**
 * Created by razorka on 24.07.16.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({
        file: path.join(__dirname,'config.json')
    });

module.exports = nconf;