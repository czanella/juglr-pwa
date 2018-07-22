import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import htmlTemplate from './htmlTemplate';

import App from '../src/App';

export default (url, store) => {
    const context = {};

    const body = renderToString(
        <StaticRouter location={url} context={context}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>,
    );

    const helmet = Helmet.renderStatic();

    return htmlTemplate(body, store.getState(), helmet);
};
