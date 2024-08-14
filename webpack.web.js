const path = require('path');

module.exports = {
  entry: './web/index.js',
  mode: 'development',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'web', '__build__'),
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
             
             
            ]
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js']  
  },

  devtool: 'source-map',  

  plugins: [
  ]
};
