module.exports = {
  devtool: 'source-map',
  plugins: [],
  entry: './web/index.js',
  mode: 'production',
  output: {
    filename: 'web-dist/__build__/index.js',
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

