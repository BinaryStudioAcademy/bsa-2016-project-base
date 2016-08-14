module.exports = {
	dbname: 'project-base',
	uri: 'mongodb://localhost/project-base',
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
}