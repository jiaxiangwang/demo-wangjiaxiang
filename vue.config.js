const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

const join = path.join

function getEntries (path) {
  let files = fs.readdirSync(resolve(path))
  const entries = files.reduce((ret, item) => {
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(itemPath)
    }
    return ret
  }, {})
  return entries
}

//dev config
const DEV_CONFIG = {
  pages: {
    index: {
      entry: 'examples/main.js',
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('packages'),
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
  devServer: {
    port: 8080,
    hot: true,
    open: 'Google Chrome'
  }
}
//prod config
const BUILD_CONFIG = {
  css: {
    extract: {
      filename: 'style/[name].css'
    }
  },
  configureWebpack: {
    entry: {
      ...getEntries('packages'),
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2',
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })

    //清除原先入口文件配置中的app项
    config.entryPoints.delete('app')

    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
  },
  outputDir: 'lib',
  productionSourceMap: false,
}

module.exports = process.env.NODE_ENV === 'development' ? DEV_CONFIG : BUILD_CONFIG
