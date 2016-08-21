var JWT = require('jsonwebtoken'),
    Cookies = require('cookies'),
    configTocken = require('../config/token'),
    configHost = require('../config/host');

module.exports = function(req, res, next) {
    var cookies = new Cookies(req, res),
        token = cookies.get('x-access-token');
    if (token){
        JWT.verify(token, configTocken['key'], function (err, decoded) {
            if (err) {
                res.status(403).send({
                    success: false,
                    message: "Failed to authenticate user"
                });
            }
            else {
                req.decoded = decoded;
                cookies.set('serverUID', decoded.id, { httpOnly: false });
                cookies.set('userRole', decoded.role, { httpOnly: false });
                cookies.set('referer', configHost['autHost']);
                next();

            }
        })
    }else {
        cookies.set('referer',  configHost['projectHost']);
        res.redirect(configHost['autHost']);
    }
};
