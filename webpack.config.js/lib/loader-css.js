"use strict";

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const extractCSS = new ExtractTextPlugin('[name].[id].[hash:5].css');

module.exports = function cssLoader(includePaths, excludePaths) {
  return ({
    resolve: {
      extensions: ['.css'],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          }),
          include: includePaths,
          exclude: excludePaths,          
         }
      ],
    },
    plugins: [
      extractCSS,
    ],
  });
};
