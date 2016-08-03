module.exports = {
	dbname: 'projects-base',
	uri: 'mongodb://localhost/projects-base',
	mocked_db: false,
	opts: {
		server: { 
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
}