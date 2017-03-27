module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 10 versions']
    }),
    require('postcss-easysprites')({
      imagePath: 'src/images/',
      spritePath: 'src/images'
    }),
    require('postcss-filter-gradient'),//поддержка градиентов ниже ie9
    require("postcss-color-rgba-fallback"),//добавляет цвет если нет поддержки прозрачности
    require('postcss-rgb-plz'),//конвертирует hex в rgb
    require('postcss-assets')({
      loadPaths: ['src/images/base64']
    }),
    require('css-mqpacker')({
      sort: true
    })
  ]
}