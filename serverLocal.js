const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const tockenMiddleware = require('./backend/middleware/tokenValidatorLocal');
const rightsMiddleware = require('./backend/middleware/rightsValidator');
const config = require('./webpack.configLocal.js');
const bodyParser = require('body-parser');
const port = 6500;
const app = express();
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(tockenMiddleware);
app.use(rightsMiddleware);
var routes = express.Router()
require('./backend/routes/routes')(routes);
app.use("/projects", routes)
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});
app.use('/upload',express.static(__dirname + '/upload'));
app.use('/icons',express.static(__dirname + '/icons'));
app.use('/resources',express.static(__dirname + '/resources'));
app.use('/backend', express.static(__dirname + '/backend'));
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
    res.write(fs.readFileSync(path.join(__dirname, '/indexLocal.html')));
    res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http:/localhost:%s/ in your browser.', port, port);
});