const path = require('path');

module.exports = {
  entry: './web/index.js',
  mode: 'development',

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'web', '__build__'),
    publicPath: '/__build__/'
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
            '@babel/plugin-proposal-optional-chaining', // Ensure optional chaining plugin is included
            '@babel/plugin-proposal-nullish-coalescing-operator' // Optional if you need nullish coalescing support as well
          ]
        }
      }
    ]
  }
};
