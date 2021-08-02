const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/core')
      }
    },
    entry: {
      app: path.join(__dirname, 'src/core', 'index.js')
    }
  }
}