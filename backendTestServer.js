/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
// app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./backend/routes/routes')(app);

if (isDeveloping) {
    app.use('/upload',express.static(__dirname + '/upload'));
    app.use('/backend', express.static(__dirname + '/backend'))
} else {
    app.use('/upload',express.static(__dirname + '/upload'));
    app.use(express.static(__dirname + '/dist'));
    app.use('/backend', express.static(__dirname + '/backend'))

    // app.get('*', function response(req, res) {
    //   res.sendFile(path.join(__dirname, 'dist/index.html'));
    // });
}
app.get("/", function(req, res){
    res.sendFile(__dirname + "/testIndex.html")
});
app.get("/auth_redirect", function(req, res){
    res.sendFile(__dirname + "/testRedirect.html")
});
app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    var open = require("open");
    open("http:/localhost:"+port);
    console.info('==> 🌎 Listening on port %s. Open up http:/localhost:%s/ in your browser.', port, port);
});
