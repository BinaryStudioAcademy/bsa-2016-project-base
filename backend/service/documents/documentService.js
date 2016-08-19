/**
 * Created by user on 16.08.2016.
 */
var google = require('googleapis');
var fs = require("fs");
var path = require("path");
var docxGenerator = require("./docxGenerator");
class DocumentService {
    constructor() {
        var {client_id, client_secret, redirect_url} = require("./config.js")
        var OAuth2 = google.auth.OAuth2;
        this.oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
        this.drive = google.drive({version: 'v3', auth: this.oauth2Client});
        this.scopes = [
            'https://www.googleapis.com/auth/drive'
        ];
    }

    /**
     *
     * @param callback(err, url)
     */
    authentication(callback) {
        var url = this.oauth2Client.generateAuthUrl({
            access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
            scope: this.scopes // If you only need one scope you can pass it as string
        });
        callback(null, url);
    }

    getData(query, callback) {
        callback(null,{
            controlSite: [{
                feature: "Authentication",
                estimateOpenCart: 5,
                estimateCustom: 10
            }, {
                feature: "Home page",
                estimateOpenCart: 5,
                estimateCustom: 5
            }, {
                feature: "Categories",
                estimateOpenCart: 3,
                estimateCustom: 7
            }, {
                feature: "Products",
                estimateOpenCart: 7,
                estimateCustom: 10
            }, {
                feature: "Banners",
                estimateOpenCart: 3,
                estimateCustom: 8
            }, {
                feature: "Promotions",
                estimateOpenCart: 4,
                estimateCustom: 10
            }],
            tradeSite:[{
                feature: "Authorization",
                estimateOpenCart:5,
                estimateCustom:10
            }, {
                feature: "Social networks registration",
                estimateOpenCart:3,
                estimateCustom:3
            }, {
                feature: "Landings",
                estimateOpenCart:5,
                estimateCustom:5
            }, {
                feature: "Account",
                estimateOpenCart:10,
                estimateCustom:15
            }],
            additionalFeatures:[{
                feature: "Module of calculation shipping by some delivery company",
                estimateOpenCart:"?",
                estimateCustom:"?"
            }, {
                feature: "Menu management module",
                estimateOpenCart:2,
                estimateCustom:5
            }]
        });
    }

    /**
     *
     * @param query
     * @param tokens{google_tokens}
     * @param callback(err, link, id)
     */
    getDocument(query, tokens, callback) {
        fs.readFile(path.join("backend/service/documents/resources/templates/testTemplate.docx"),
            "binary", function (err, template) {
            if (err){callback(err);return;}
            this.getData(query, function(err, data){
                if (err){callback(err);return;}
                docxGenerator.generate(data,template, function(err, docx){
                    if (err){callback(err);return;}
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
