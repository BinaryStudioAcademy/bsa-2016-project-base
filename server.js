/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const tockenMiddleware = require('./backend/middleware/tokenValidator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./backend/routes/routes')(app);
app.use(tockenMiddleware);
if (isDeveloping) {
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
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

} else {
  app.use('/upload',express.static(__dirname + '/upload'));
  app.use(express.static(__dirname + '/dist'));

  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http:/localhost:%s/ in your browser.', port, port);
});
