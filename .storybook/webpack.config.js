// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  module: {
    loaders: [
      // TODO: Extract out common CSS loader part from root's webpack.config.js
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
};
