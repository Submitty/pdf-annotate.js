const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

let fileName = 'pdf-annotate';
let optimization = {};

if (process.env.MINIFY) {
  fileName += '.min';
  optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()]
  };
}

module.exports = {
  devtool: 'source-map',
  optimization: optimization,
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
          plugins: [
            'add-module-exports',
            '@babel/plugin-proposal-optional-chaining', // Ensure optional chaining plugin is included
            '@babel/plugin-proposal-nullish-coalescing-operator' // Optional if you need nullish coalescing support as well
          ]
        }
      }
    ]
  }
};
