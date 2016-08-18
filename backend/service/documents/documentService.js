/**
 * Created by user on 16.08.2016.
 */
var google = require('googleapis');
var fs = require("fs");
var Docxtemplater = require('docxtemplater');
var path = require("path");
var NeedAuthError = require("./NeedAuthError");
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
    authentication(callback){
        var url = this.oauth2Client.generateAuthUrl({
            access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
            scope: this.scopes // If you only need one scope you can pass it as string
        });
        callback(null, url);
    }

    /**
     *
     * @param query
     * @param tokens{google_tokens}
     * @param callback(err, link, id)
     */
    getDocument(query, tokens, callback) {
        fs.readFile(path.join("upload/resources/documents/templates/testTemplate.docx"), "binary", function (err, content) {
            var doc = new Docxtemplater(content);
            //set the templateVariables
            var names = [];
            for (let i = 0; i < 10; i += 1) {
                names.push({first_name: "qwe" + i, last_name: "asd" + i})
            }
            doc.setData({
                title: "Title",
                names,
                end: "End"
            });
            //apply them (replace all occurences of {first_name} by Hipp, ...)
            doc.render();

            var buf = doc.getZip()
                .generate({type: "nodebuffer"});
            this.uploadFile(buf, tokens, callback)
        }.bind(this))
    }

    /**
     *
     * @param file{Buffer}
     * @param tokens{google_tokens}
     * @param callback(err, link, id)
     */
    uploadFile(file, tokens, callback) {
        this.oauth2Client.setCredentials({access_token:tokens.access_token});
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
            res.redirect(`/?tokens=${tokensStr}`);
        }.bind(this));
    }
}
module.exports = new DocumentService();