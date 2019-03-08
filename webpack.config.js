const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let fileName = 'pdf-annotate';
let plugins = [];

if (process.env.MINIFY) {
  fileName += '.min';
  plugins.push(
    new UglifyJsPlugin({
      sourceMap: true
    })
  );
}

module.exports = {
  devtool: 'source-map',
  plugins: plugins,
  entry: './index.js',
  mode: 'production',
  output: {
    filename: fileName + '.js',
    path: path.join(__dirname, 'dist'),
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
