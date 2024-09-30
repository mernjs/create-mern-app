//@ts-check
'use strict';

/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webExtensionConfig = {
	mode: 'none',
	target: 'webworker',
	entry: {
		'extension': './src/web/extension.ts',
		'bundle': './src/web/index.js' 
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist/web'),
		libraryTarget: 'commonjs',
		devtoolModuleFilenameTemplate: '../../[resource-path]'
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'], 
		alias: {
			'process/browser': require.resolve('process/browser.js'),
		},
		fallback: {
			'assert': require.resolve('assert'),
			'path': require.resolve('path-browserify'),
			'process': require.resolve('process/browser'),
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [{
					loader: 'ts-loader'
				}]
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', 
					'postcss-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
		new webpack.ProvidePlugin({
            process: 'process/browser', 
        }),
	],
	externals: {
		'vscode': 'commonjs vscode',
	},
	performance: {
		hints: false
	},
	devtool: 'nosources-source-map',
	infrastructureLogging: {
		level: "log",
	},
};

module.exports = [ webExtensionConfig ];
