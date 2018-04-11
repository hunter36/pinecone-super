'use strict'
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/ldo': {
        target: 'http://211.138.112.132:2704',
        changeOrigin: true,
      }
    },
    open: true,
    openPage: 'store.html'
  }
})

module.exports = devWebpackConfig