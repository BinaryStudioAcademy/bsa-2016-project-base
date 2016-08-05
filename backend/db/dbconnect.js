function dbConnectionHandler() {
var mongoose = require('mongoose');
var config = require('../config/db');

mongoose.connect(config.uri, config.opts);

mongoose.set('debug', true);

this.connection = mongoose.connection;

mongoose.connection.on('connected', function() {
	this.state = 'connected to db';
	console.log(this.state);
});

mongoose.connection.on('error', function(err) {
	this.state = 'disconnected from db';
	console.log(this.state);
});

mongoose.connection.on('disconnected', function() {
	this.state = 'disconnected from db';
	console.log(this.state);
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		this.state = 'disconnected';
		process.exit(0);
	});
});

}

module.exports = new dbConnectionHandler(); 