import React from 'react';
import logo from './logo.png';

import styles from './styles.scss';

function Home() {
    return (
        <div className={styles.home}>
            <img src={logo} className={styles.logo} alt={'Juglr'} />
        </div>
    )
}

export default Home;
