const { merge } = require("webpack-merge");
const commonWebpack = require("./webpack.config.common");

module.exports = merge(commonWebpack, {
  mode: "development",
  devtool: "inline-source-map",
});
