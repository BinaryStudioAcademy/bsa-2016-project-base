/**
 * Created by razor on 16.08.16.
 */
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var key = ('./user.json');
var oauth2Client = new OAuth2(key.web.client_id, key.web.client_secret, 'http://localhost:3000/');
var open = require('open');
var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
});



export function openAuth() {
    open(url);
}

