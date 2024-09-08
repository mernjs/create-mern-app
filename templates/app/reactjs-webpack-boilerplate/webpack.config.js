const webpack = require('webpack');
const path = require('path');
const env = require('./scripts/env');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fileExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'eot',
    'otf',
    'svg',
    'ttf',
    'woff',
    'woff2',
];

const options = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'source-map-loader',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: fileExtensions
            .map((extension) => '.' + extension)
            .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin({ verbose: false }),
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html',
            chunks: ['index'],
            cache: false,
        }),
    ],
    infrastructureLogging: {
        level: 'info',
    },
};

if (env.NODE_ENV === 'development') {
    options.devtool = 'cheap-module-source-map';
} else {
    options.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    };
}

module.exports = options;
