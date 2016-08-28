var Cookies = require('cookies');

module.exports = function(req, res, next) {
	var directions = [], cookies = new Cookies(req, res),
	role = cookies.get('userRole').toLowerCase(),
		matches = req.url.split('/'),
		currentDirection = matches[2];
    switch(req.method.toLowerCase()){
    	case 'get':
    		if(role != 'admin'){
    			directions = ['technologies','tags','users'];
    			if(role == 'user' && currentDirection == 'documents'){
    				directions.push('directions','test');
    				currentDirection = matches[3];
    			}
    		}
    		break;
    	case 'post':
    		if(role != 'admin'){
    			directions.push('conditions','projects','stages');
    			if(role == 'manager') directions.push('tags');
    			if(role == 'user') directions.push('projects','technologies','file','users','sections');
    		}
    		break;
    	case 'put':
    		if(role != 'admin'){
    			directions.push('tags','technologies','users');
    			if(role == 'user') directions.push('conditions','features','projects','sections');
    		}
    		break;
    	case 'delete':
    		directions.push('users');
    		if(role != 'admin'){
    			directions = ['technologies','tags','stages','projects','conditions','file'];
    			if(role == 'user') directions.push('file','sections','features');
    		}
    		break;
    }
    //console.log(currentDirection,directions.indexOf(currentDirection),directions);
	if(directions.indexOf(currentDirection) != -1) res.send(500, { error: 'You have not rights' });
	next();
}