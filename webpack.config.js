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
  stats: 'verbose',
  devtool: 'source-map',
  optimization,
  entry: './index.js',
  mode: 'production',
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      process: require.resolve('process/browser')
    }
  },
  output: {
    filename: fileName + '.js',
    path: path.join(__dirname, 'dist'),
    library: {
      name: 'PDFAnnotate',
      type: 'umd'
    }
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
            plugins: ['add-module-exports']
          }
        }
      }
    ]
  }
};
