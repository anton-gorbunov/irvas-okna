'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    chunkLoading: false,
    wasmLoading: false,
    filename: 'bundle.js',
    path: __dirname + '/src/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
