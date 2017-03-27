const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let NODE_ENV = process.env.NODE_ENV || 'development';

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
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
          {
            loader: 'image-webpack-loader',
            query: {
              imageminPngquant: {
                quality: '65-90',
                speed: 4
              },
              imageminMozjpeg: {
                quality: 75,
                interlaced: false,
                progressive: true,
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false
                    },
                    {
                      removeEmptyAttrs: false
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my app',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: NODE_ENV == 'production'
      },
      hash: NODE_ENV == 'development'
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      disable: false,
      allChunks: true
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/logo.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'favicon/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'manifest.json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Webpack App',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new CopyWebpackPlugin([
      {from: 'src/fonts/', to: 'fonts'}
    ])
  ]
}
