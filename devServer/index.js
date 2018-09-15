import path from 'path';
import express from 'express';
import webpack from 'webpack';
import notifier from 'node-notifier';
import opn from 'opn';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.client.js';
import htmlTemplate from '../server/htmlTemplate';

const app = express();

const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: '/static',
}));

app.get('*', (req, res) => {
    res.send(htmlTemplate());
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
