const webpack = require('webpack');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'sinon-chai'],

    files: [
      'test/**/*.spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'test/**/*.spec.js': ['webpack', 'sourcemap']
    },

    reporters: ['dots', 'coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Firefox', 'Chrome'],

    singleRun: false,

    webpack: {
      mode: 'development',
      cache: true,
      devtool: 'inline-source-map',
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
          /*
          {
            test: /\.js$/,
            exclude: /(node_modules|test)/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
            options: {
              esModules: true
            }
          }
          */
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.CI': JSON.stringify(process.env.CI),
          'process.env.TRAVIS': JSON.stringify(process.env.TRAVIS)
        })
      ]
    },

    webpackServer: {
      stats: {
        colors: true
      }
    }
  /*
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.'
    }
  */
  });
};
