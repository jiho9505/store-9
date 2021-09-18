const { merge } = require('webpack-merge');
const commonWebpack = require('./webpack.config.common');

module.exports = merge(commonWebpack, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
