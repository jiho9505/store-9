const { merge } = require("webpack-merge");
const commonWebpack = require("./webpack.config.common");

module.exports = merge(commonWebpack, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "../dist",
    host: "localhost",
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
});
