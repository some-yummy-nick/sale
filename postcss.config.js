module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 10 versions']
    }),
    require('postcss-easysprites')({
      imagePath: 'src/images/',
      spritePath: 'src/images'
    }),
    require('postcss-assets')({
      loadPaths: ['src/images/base64']
    }),
    require('css-mqpacker')({
      sort: true
    })
  ]
}