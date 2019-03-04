module.exports = {
  entry: './web/index.js',
  mode: 'development',

  output: {
    filename: 'index.js',
    path: 'web/__build__',
    publicPath: '/__build__/'
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

