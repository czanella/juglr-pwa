import express from 'express';
import storeFactory from '../src/redux/storeFactory';
import ssr from './ssr';

import { registerHello } from '../src/redux/actions';

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
