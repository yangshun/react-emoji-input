'use strict';

const webpack = require('webpack');

const env = process.env.NODE_ENV;
const config = {
  resolve: {
    root: ['src'],
    extensions: ['', '.js', '.jsx'],
    moduleDirectories: ['node_modules'],
  },
  output: {
    library: 'react-component-starter',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
      mangle: {
        screw_ie8 : true,
        keep_fnames: true,
      },
    })
  );
}

module.exports = config;
