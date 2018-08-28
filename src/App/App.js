import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { number, func } from 'prop-types';
import Home from '../views/Home';

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
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        winow.removeEventListener('resize', this.onResize);
    }

    onResize() {
        const { setDimensions } = this.props;

        setDimensions(
            Math.min(0.75 * window.innerHeight, window.innerWidth),
            window.innerHeight,
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
                <Route exact path={'/'} component={Home} />
            </div>
        );
    }
}

App.propTypes = propTypes;

export default App;
