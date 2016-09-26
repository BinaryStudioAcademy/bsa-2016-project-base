var {PROTOCOL,HOST,PORT} = require('../constants/Api');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var key = ('./user.json');
var oauth2Client = new OAuth2(
	key.web.client_id, 
	key.web.client_secret, 
	`${PROTOCOL}://${HOST}:${PORT}/`
);
var open = require('open');
var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes 
});

export function openAuth() { open(url); }

