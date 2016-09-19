const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const tockenMiddleware = require('./backend/middleware/tokenValidator');
const rightsMiddleware = require('./backend/middleware/rightsValidator');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');
const port = 6500;
const app = express();
var isProduction = process.env.NODE_ENV === "production"
//app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(tockenMiddleware);
//set userRole to "admin"
{
  var Cookies = require("cookies")
  app.use(function(req, res, next){
    var cookies = new Cookies(req, res)
    cookies.set('userRole', "ADMIN", { httpOnly: false });
    next()
  })
}
app.use(rightsMiddleware)
app.use(require("./backend/middleware/userSync"))
var indexHtmlFileName;
if (isProduction){
  indexHtmlFileName = "/index.html"
  require('./backend/routes/routes')(app);
}else {
  //var routes = express.Router()
  indexHtmlFileName = "/indexLocal.html"
  //require('./backend/routes/routes')(routes);
  require('./backend/routes/routes')(app);
  //app.use("/projects", routes)
}


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
  res.write(fs.readFileSync(path.join(__dirname, indexHtmlFileName)));
  res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open uphttp://team.binary-studio.com/projects in your browser.', port, port);
});
