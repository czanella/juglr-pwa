const webpackServer = require('./webpack.config.server');
const ExecutePlugin = require('./plugins/ExecutePlugin');

const webpackBuildHtmlConfig = Object.assign({}, webpackServer, {
    entry: {
        buildHtml: './server/buildHtml.js',
    },
});

webpackBuildHtmlConfig.plugins = webpackBuildHtmlConfig.plugins.concat([
    new ExecutePlugin({
        bundleName: 'buildHtml.js',
    }),
]);

module.exports = webpackBuildHtmlConfig;
