const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const cssLoaderOptions = {
    importLoaders: 2,
    modules: true,
    localIdentName: '[local]-[hash:base64]',
    sourceMap: true,
};

const configs = [{
    entry: ['./src/main.js'],
    output: {
        path: path.join(__dirname, 'public', 'static'),
        publicPath: '/static',
        filename: 'app.bundle.js',
    },
    target: 'web',
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: cssLoaderOptions,
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /src.*\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: '/static',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'app.bundle.css',
            allChunks: true,
        }),
        new CopyWebpackPlugin([
            { from: './theme/fonts', to: 'fonts' },
        ]),
    ],
    devtool: 'eval-source-map',
}];

switch (process.env.NODE_ENV) {
    case 'development':
        configs.unshift({
            entry: [
                'react-hot-loader/patch',
                'webpack-hot-middleware/client',
            ],
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ],
        });
        break;

    case 'production':
        configs.push({
            devtool: 'source-map',
            plugins: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    uglifyOptions: {
                        filename: 'app.bundle.js.map',
                    },
                }),
            ],
        });

        Object.assign(cssLoaderOptions, {
            minimize: true,
        });
        break;

    default:
        break;
}

module.exports = webpackMerge(configs);
