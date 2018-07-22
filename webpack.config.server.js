const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ExecutePlugin = require('./plugins/ExecutePlugin');

if (__dirname.length === 1) {
    __dirname = process.cwd();
}

const webpackConfigServer = {
    entry: {
        server: './server/index.js',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: '/',
    },
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: nodeExternals(),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[local]-[hash:base64]',
                        },
                    },
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|gif|svg|eot|otf|svg|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: false,
                            publicPath: '/static',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new UglifyJsPlugin()],
};

switch (process.env.NODE_ENV) {
    case 'development':
        webpackConfigServer.plugins.push(new ExecutePlugin({
            bundleName: 'server.js',
        }));
        break;

    default:
        break;
}

module.exports = webpackConfigServer;
