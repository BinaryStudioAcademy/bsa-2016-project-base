var Cookies = require('cookies');
var JWT = require('jsonwebtoken');
var configHost = require('../config/host');
var configTocken = require('../config/token');

module.exports = function(req, res, next) {
    var cookies = new Cookies(req, res);
    var token = cookies.get('x-access-token');
    if (token){
        JWT.verify(token, configTocken['key'], function (err, decoded) {
            if (err) res.status(403).send({
                success: false,
                message: "Failed to authenticate user"
            });
            else{
                req.decoded = decoded;
                cookies.set('userEmail', decoded.email, { httpOnly: false });
                cookies.set('userRole', decoded.role, { httpOnly: false });
                cookies.set('referer', configHost['autHost']);
                next();
            }
        });
    }else {
        cookies.set('referer',  configHost['projectHost']);
        res.redirect(configHost['autHost']);
    }
};


