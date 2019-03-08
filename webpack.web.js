const path = require('path');

module.exports = {
  entry: './web/index.js',
  mode: 'development',

  output: {
    filename: 'index.js',
    path: path.resolve('web/__build__'),
    publicPath: path.resolve('/__build__/')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};

