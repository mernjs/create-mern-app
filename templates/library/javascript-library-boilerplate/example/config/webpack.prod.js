const { merge } = require('webpack-merge')
const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: '[name].[contenthash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [

    ],
    optimization: {
        minimize: true,
        minimizer: ['...'],
        runtimeChunk: {
            name: 'runtime',
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})