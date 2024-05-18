process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const env = require('./env');
const path = require('path');

config.entry = [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?hot=true&live-reload=true&hostname=localhost&port=${env.PORT}`,
    config.entry,
];

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
    config.plugins || [],
);

const compiler = webpack(config);

const server = new WebpackDevServer(
    {
        hot: false,
        open: true,
        client: false,
        host: 'localhost',
        port: env.PORT,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '../build'),
        },
        devMiddleware: {
            publicPath: `http://localhost:${env.PORT}/`,
            writeToDisk: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        allowedHosts: 'all',
    },
    compiler,
);


if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

(async () => {
    await server.start();
})();
