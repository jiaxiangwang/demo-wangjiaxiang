'use strict'
const path = require('path')

function resolve (dir) {
  return path.join()
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('packages')
    }
  }
}
