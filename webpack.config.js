var webpack = require('webpack');
var path = require('path');

var watch = (process.argv.indexOf('--watch') !== -1);
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  entry: {
    collect: './src/main.js'
  },
  output: {
    filename: watch ? 'dist/[name].js' : 'dist/[name].min.js',
    path: './',
    library: 'CollectError',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js'],
    root: [__dirname + '/src', __dirname + '/node_modules']
  },
  resolveLoader: {
    fallback: [path.join(__dirname, './node_modules'), path.join(
      __dirname, './src')]
  },
  eslint: {
    //  eslint的配置文件
    configFile: '.eslintrc'
  },
  module: {
    //  在loader之前,通过 eslint 检查code
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new UnminifiedWebpackPlugin()
  ]
};
