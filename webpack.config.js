var webpack = require('webpack');

var PRODUCTION = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: './js/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: "dist"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }
    ]
  },
  devtool: PRODUCTION ? "" : "#inline-source-map",
  plugins: PRODUCTION ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
