const fs = require('fs');
const path = require('path');
const SANDBOX_DIR = path.resolve(process.cwd(), 'sandbox');

function buildEntries() {
  return fs.readdirSync(SANDBOX_DIR).reduce((entries, dir) => {
    if (dir === 'build' || dir === 'shared') {
      return entries;
    }

    let isDraft = dir.charAt(0) === '_';
    let isDirectory = fs.lstatSync(path.join(SANDBOX_DIR, dir)).isDirectory();

    if (!isDraft && isDirectory) {
      entries[dir] = path.join(SANDBOX_DIR, dir, 'index.js');
    }

    return entries;
  }, {});
}

module.exports = {
  entry: buildEntries(),

  mode: 'development',

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, 'sandbox', '__build__'),
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
  },
  optimization: {
    splitChunks: {
      name: 'shared.js'
    }
  }
};
