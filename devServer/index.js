const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const notifier = require('node-notifier');
const opn = require('opn');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.client.js');

const HTML_TEMPLATE = fs.readFileSync(path.resolve(__dirname, 'index.html'));

const app = express();

const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: '/static',
}));

app.use(webpackHotMiddleware(webpackCompiler));

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(HTML_TEMPLATE);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

    notifier.notify({
        message: `Server listening on port ${PORT}`,
        wait: true,
    });

    notifier.on('click', () => {
        opn(`http://localhost:${PORT}`);
    });
});
