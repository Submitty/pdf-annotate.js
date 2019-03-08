const path = require('path');

module.exports = {
  devtool: 'source-map',
  plugins: [],
  entry: './web/index.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'web-dist'),
    library: 'PDFAnnotate',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['add-module-exports']
        }
      }
    ]
  }
};

