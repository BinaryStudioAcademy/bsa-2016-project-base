/**
 * Created by razorka on 24.07.16.
 */
var winston = require('winston');
var ENV = process.env.NODE_ENV;
function getLogger(module) {
    var path = module.filename.split('/').
            slice(-2).join('/');

    return new winston.Logger({
        level : 'debug',
        transports :[
            new winston.transports.Console({
                colorize: true,
                label : path
            })
        ]
    });
}

module.exports = getLogger;