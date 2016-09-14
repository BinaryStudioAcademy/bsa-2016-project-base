var documentService = require("./../service/documents/documentService");
var apiResponse = require('express-api-response');
var fs = require("fs");

module.exports = function(app) {

    app.get("/google_auth_redirect", function(req,res){
        fs.readFile("backend/service/documents/resources/googleAuthRedirect.html", function(err, file){
            res.end(file);
        })
    });

    app.get('/api/documents/authentication', function(req, res, next){
        documentService.authentication(function(err, link){
            res.err = err;
            res.data = {link};
            next()
        })
    }, apiResponse);

    app.get('/api/documents/test/:tokens', function (req, res, next) {
        var tokens = JSON.parse(req.params.tokens);
        documentService.getDocument("", tokens, function(err, link){
            res.err = err;
            res.data = {link};
            next()
        })
    }, apiResponse);

    app.post('/api/documents/estimation/:tokens', function (req, res, next) {
        var tokens = JSON.parse(req.params.tokens);
        console.log(req.body);
        documentService.getDocument(req.body, tokens, function(err, link){
            res.err = err;
            res.data = {link};
            next()
        })
    }, apiResponse);

    app.get('/api/documents/callback', function(req,res){
        documentService.redirectUrlCallback(req, res);
    }, apiResponse);
    
};
