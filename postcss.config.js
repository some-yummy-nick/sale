module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 10 versions']
    }),
    require('postcss-easysprites')({
      imagePath: 'src/images/',
      spritePath: 'src/images'
    }),
    require('postcss-flexibility'),//для поддержки flexbox в ie 8 & 9
    require('postcss-line-height-px-to-unitless')(), //line-height из px в число
    require('postcss-inline-svg')(), //вставка svg в css
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