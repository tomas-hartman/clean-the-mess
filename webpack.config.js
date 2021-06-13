const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/_dev/style-dev/screens/overview.jsx'),
    path.join(__dirname, 'src/_dev/style-dev/screens/details.jsx'),
    path.join(__dirname, 'src/_dev/style-dev/screens/latest.jsx'),
    path.join(__dirname, 'src/_dev/style-dev/screens/search.jsx'),
    path.join(__dirname, 'src/_dev/style-dev/style.scss'),

  ],
  output: { path: path.join(__dirname, 'dist/webpack'), filename: 'index.bundle.js' },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'), 'node_modules',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/_dev/style-dev/index.html'),
    }),
    new webpack.NormalModuleReplacementPlugin(
      /webextension-polyfill/,
      path.resolve(
        './src/_dev/webextension.mock.js',
      ),
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/webpack'),
    compress: true,
    port: 9000,
  },
};
