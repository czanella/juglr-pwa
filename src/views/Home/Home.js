import React, { Component } from 'react';
import logo from './logo.png';
import playButton from './playButton.png';
import soundButton from './soundButton.png';
import aboutButton from './aboutButton.png';

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
                    <img src={playButton} className={styles.play} alt={'Play'} />
                    <img src={soundButton} className={styles.sound} alt={'Sound'} />
                    <img src={aboutButton} className={styles.about} alt={'About'} />
                </div>
            </div>
        );
    }
}

export default Home;
