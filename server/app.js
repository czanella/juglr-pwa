const express = require('express');
const storeFactory = require('../src/redux/storeFactory').default;
const ssr = require('./ssr').default;

const { registerHello } = require('../src/redux/actions');

const app = express();

app.use('/static', express.static('static'));

app.use((req, res, next) => {
    res.locals.store = storeFactory();
    next();
});

app.get('/', (req, res, next) => {
    res.locals.store.dispatch(registerHello('WAWAWAAAAAA'));
    next();
});

app.get('*', (req, res) => {
    res.send(ssr(req.url, res.locals.store));
});

export default app;
