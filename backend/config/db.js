module.exports = {
	dbname: 'projects-base',
	uri: 'localhost:27017',
	mocked_db: false,
	opts: {
		server: { 
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
}