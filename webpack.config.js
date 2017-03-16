var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    script: './src/js/script.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
          publicPath: "/dist"
        })
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer:{
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    stats:"errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/html/index.html',
      minify: {
        collapseWhitespace: NODE_ENV == 'production'
      },
      hash: NODE_ENV == 'development'
    }),
    new ExtractTextPlugin({
      filename: "style/main.css",
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/json/', to: 'json' },
      { from: 'src/libraries/', to: 'libraries' },
      { from: 'src/images/', to: 'images' }
    ])
  ]
}
