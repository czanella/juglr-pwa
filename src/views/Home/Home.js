import React from 'react';
import { string, func } from 'prop-types';

import staticmap from './staticmap.png';

import styles from './styles.scss';

const propTypes = {
    message: string.isRequired,
    changeHello: func.isRequired,
};

function Home({ message, changeHello }) {
    return (
        <div className={styles.home}>
            <p>Hey there, {message}, what's up!!!!!</p>
            <button onClick={() => changeHello('world')}>
                world
            </button>
            <button onClick={() => changeHello('mate')}>
                mate
            </button>
            <br />
            <img src={staticmap} alt={'map'} />
        </div>
    );
}

Home.propTypes = propTypes;

export default Home;
