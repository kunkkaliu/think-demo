/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('@insanecoding/inline-manifest-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry: {
    main: resolve('view/index.js'),
  },
  output: {
    path: resolve('www'),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
    publicPath: '/',
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      title: '测试一下',
      filename: resolve('www/index.html'),
      template: resolve('view/template.html'),
      inject: true,
      favicon: resolve('favicon.ico'),
      chunks: ['runtime', 'vendor', 'main'],
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeComments: true,
      },
    }),
    new InlineManifestWebpackPlugin('runtime'),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      view: resolve('view'),
    },
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [[
          '@babel/preset-env', {
            targets: {
              browsers: [
                '> 1%',
                'last 2 versions',
                'ie >= 9',
                'iOS >= 8',
                'Android >= 4',
              ],
            },
            modules: false,
            useBuiltIns: false,
            debug: false,
            loose: true,
          },
        ], '@babel/preset-react'],
        plugins: [[
          '@babel/plugin-transform-runtime', {
            corejs: 3,
          },
        ]],
      },
      exclude: /node_modules/,
      include: resolve(''),
    }],
  },
};
