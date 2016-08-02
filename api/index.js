/**
 * Created by razor on 02.08.16.
 */

var users = require('./users');
var projects = require('./projects');
var technologies = require('./technologies');
var stages = require('./stages');
var tags = require('./tags');
var conditions = require('./conditions');
var features = require('./features');
var subfeatures = require('./subfeatures');

module.exports = function (app) {
    return {
        users: users(app),
        projects: projects(app),
        technologies: technologies(app),
        tags: tags(app),
        conditions: conditions(app),
        features:features(app),
        subfeatures:subfeatures(app)

    };
};