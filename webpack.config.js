var webpack = require('webpack');

var PRODUCTION = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: "dist"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  devtool: PRODUCTION ? "eval" : "#inline-source-map",
  plugins: PRODUCTION ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
