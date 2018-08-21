import React, { Component } from 'react';
import logo from './logo.png';
import HomeButton from '../../components/HomeButton';

import styles from './styles.scss';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.home}>
                <img src={logo} className={styles.logo} alt={'Juglr'} />
                <div className={styles.buttons}>
                    <HomeButton className={styles.play} />
                    <div className={styles.buttonRow}>
                        <HomeButton className={styles.soundOn} />
                        <HomeButton className={styles.question} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
