var utils = require("./utils");
var webpack = require("webpack");
var config = require("../config");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.conf");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.dev.assetsRoot
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": config.dev.env
    }),
    new HtmlWebpackPlugin({
      filename: config.dev.index,
      template: "index.html",
      inject: true
    })
  ]
});
