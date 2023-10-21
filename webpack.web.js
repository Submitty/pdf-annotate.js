const path = require('path');

module.exports = {
  entry: './web/index.js',
  mode: 'development',

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'web', '__build__'),
    publicPath: '/__build__/'
  },

  devServer: { static: { directory: path.resolve(__dirname, './web') } },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

