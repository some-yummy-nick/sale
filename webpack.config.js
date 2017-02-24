var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.bundle.js'
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/assets/index.html',
      minify: {
        collapseWhitespace: NODE_ENV == 'production'
      },
      hash: NODE_ENV == 'development'
    }),
    new ExtractTextPlugin({
      filename: "css/app.css",
      disable: false,
      allChunks: true
    })
  ]
}
