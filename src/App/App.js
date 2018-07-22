import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';

import Home from '../views/Home';

import styles from './styles.scss';

function App() {
    return (
        <div className={styles.app}>
            <Helmet>
                <title>Juglr</title>
            </Helmet>
            <Route exact path={'/'} component={Home} />
        </div>
    );
}

export default hot(module)(App);
