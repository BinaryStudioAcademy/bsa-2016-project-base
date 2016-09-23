'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var mainJsFileName;
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

var isProduction = process.env.NODE_ENV === "production"
if (isProduction){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
  mainJsFileName = "frontend/app/main.js"
}else {
  mainJsFileName = 'frontend/app/mainLocal.js'
}
module.exports = {
  devtool: isProduction?"":'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, mainJsFileName)
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: plugins

    /*new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })*/
  ,
  resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.sass$/,
      loader: "style!css?&modules&localIdentName=[local]!postcss!sass?"
    }]
  }
};
