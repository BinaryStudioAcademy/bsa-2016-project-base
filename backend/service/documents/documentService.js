"use strict";
var google = require('googleapis');
var fs = require("fs");
var path = require("path");
var docxGenerator = require("./docxGenerator");
var config = require("./config.js");
var projectRepository = require("./../../repositories/projectRepository")
class DocumentService {
    constructor() {
        var OAuth2 = google.auth.OAuth2;
        this.oauth2Client = new OAuth2(config.client_id,config.client_secret,config.redirect_url);
        this.drive = google.drive({version: 'v3', auth: this.oauth2Client});
        this.scopes = [
            'https://www.googleapis.com/auth/drive'
        ];
    }
    authentication(callback) {
        var url = this.oauth2Client.generateAuthUrl({
            access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
            scope: this.scopes // If you only need one scope you can pass it as string
        });
        callback(null, url);
    }
    getData(query, callback) {
        //if (query.estimation && query.projectId){
        console.log("query", query)
            projectRepository.update(query.projectId, {estimation:query.estimation})
            callback(null, query.estimation)
        //}else{
        //    callback(null, query);
        //}
        // callback(null, [
        //      [
        //     {
        //         sectionName: 'lala',
        //         featires: [
        //             {
        //                 featuresName: 'lala',
        //                 custom: 4,
        //                 lib: 5
        //             }
        //         ]
        //     }
        // ]
        //          controlSite: [{
        //         feature: "Authentication",
        //         estimateOpenCart: 5,
        //         estimateCustom: 10
        //     }, {
        //         feature: "Home page",
        //         estimateOpenCart: 5,
        //         estimateCustom: 5
        //     }, {
        //         feature: "Categories",
        //         estimateOpenCart: 3,
        //         estimateCustom: 7
        //     }, {
        //         feature: "Products",
        //         estimateOpenCart: 7,
        //         estimateCustom: 10
        //     }, {
        //         feature: "Banners",
        //         estimateOpenCart: 3,
        //         estimateCustom: 8
        //     }, {
        //         feature: "Promotions",
        //         estimateOpenCart: 4,
        //         estimateCustom: 10
        //     }],
        //     tradeSite:[{
        //         feature: "Authorization",
        //         estimateOpenCart:5,
        //         estimateCustom:10
        //     }, {
        //         feature: "Social networks registration",
        //         estimateOpenCart:3,
        //         estimateCustom:3
        //     }, {
        //         feature: "Landings",
        //         estimateOpenCart:5,
        //         estimateCustom:5
        //     }, {
        //         feature: "Account",
        //         estimateOpenCart:10,
        //         estimateCustom:15
        //     }],
        //     additionalFeatures:[{
        //         feature: "Module of calculation shipping by some delivery company",
        //         estimateOpenCart:"?",
        //         estimateCustom:"?"
        //     }, {
        //         feature: "Menu management module",
        //         estimateOpenCart:2,
        //         estimateCustom:5
        //     }]
        // });
    }

    /**
     *
     * @param query
     * @param tokens{google_tokens}
     * @param callback(err, link, id)
     */
    getDocument(query, tokens, callback) {
        fs.readFile(path.join("backend/service/documents/resources/templates/estimateTemplate.docx"), "binary", function (err, template) {
            this.getData(query, function(err, data){
                docxGenerator.generate(data,template, function(err, docx){
                    this.uploadFile(docx, tokens, callback)
                }.bind(this));
            }.bind(this));
        }.bind(this))
    }

    /**
     *
     * @param file{Buffer}
     * @param tokens{google_tokens}
     * @param callback(err, link, id)
     */
    uploadFile(file, tokens, callback) {
        this.oauth2Client.setCredentials({access_token: tokens.access_token});
        this.drive.files.create({
            resource: {
                name: "upload" + Date.now(),
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            fields: 'webViewLink,id',
            media: {
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                body: file // read streams are awesome!
            }
        }, function (err, file, res) {
            if (err) callback(err);
            else {
                console.log("Uploaded ", file.webViewLink);
                callback(err, file.webViewLink, file.id)
            }
        });
    }

    redirectUrlCallback(req, res) {
        var code = req.query.code;
        this.oauth2Client.getToken(code, function (error, tokens) {
            if (error) {
                res.err = error
            }
            var tokensStr = JSON.stringify(tokens);
            res.redirect(`/google_auth_redirect/?tokens=${tokensStr}`);
        }.bind(this));
    }
}
module.exports = new DocumentService();
