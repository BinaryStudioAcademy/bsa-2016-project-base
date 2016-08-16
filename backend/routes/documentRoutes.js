var documentService = require("./../service/documents/documentService");
var apiResponse = require('express-api-response');


module.exports = function(app) {
    app.get('/api/documents/authentication', function(req, res, next){
        documentService.authentication(function(err, link){
            res.err = err;
            res.data = {link};
            next()
        })
    }, apiResponse);
    app.get('/api/documents/test', function (req, res, next) {
        documentService.getDocument("", function(err, link){
            res.err = err;
            res.data = {link};
            next()
        })
    }, apiResponse);
    app.get('/api/documents/callback', function(req,res){
        documentService.redirectUrlCallback(req, res);
    }, apiResponse);
};






