/**
 * Created by liudonghui on 2018/3/7.
 */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.config');

base.mode = 'production';
base.devtool = 'source-map';
Object.keys(base.entry).forEach((name) => {
	base.entry[name] = [].concat(base.entry[name]);
});
base.output.filename = 'static/js/[name].[chunkhash].js';
base.output.chunkFilename = 'static/js/[name].[chunkhash].js';

base.optimization = {
	runtimeChunk: {
		name: 'runtime',
	},
	splitChunks: {
		cacheGroups: {
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				chunks: 'all',
			},
		},
	},
};

base.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		},
	}),
	new MiniCssExtractPlugin({
		filename: 'static/css/[name].[contenthash].css',
	}),
	new webpack.HashedModuleIdsPlugin(),
);

module.exports = base;
