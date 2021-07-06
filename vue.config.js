
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: '/',
  productionSourceMap: false, // false 不產生 map 文件,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/scss/variables.scss";`
      },
    }
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set('@', resolve('src/'));
  },
}
