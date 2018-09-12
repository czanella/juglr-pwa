import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { number, func } from 'prop-types';
import Game from '../views/Game';
import Home from '../views/Home';
import About from '../views/About';
import DelayedRoute from '../components/DelayedRoute';

import styles from './styles.scss';

const propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    setDimensions: func.isRequired,
};

class App extends Component {
    constructor(props) {
        super(props);

        this.onResize = this.onResize.bind(this);
        this.onResize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        const { setDimensions } = this.props;

        setDimensions(
            Math.floor(Math.min(0.75 * window.innerHeight, window.innerWidth)),
            Math.floor(window.innerHeight),
        );
    }

    render() {
        const { width, height } = this.props;

        const appStyle = {
            width: `${width}px`,
            height: `${height}px`,
        };

        return (
            <div className={styles.app} style={appStyle}>
                <Helmet>
                    <title>Juglr</title>
                </Helmet>
                <Route path={'/:view?'} component={Game} />
                <DelayedRoute exact path={'/'} component={Home} />
                <DelayedRoute path={'/about'} component={About} />
            </div>
        );
    }
}

App.propTypes = propTypes;

export default App;
