import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import logo from './logo.png';
import HomeButton from '../../components/HomeButton';

import styles from './styles.scss';

const propTypes = {
    soundOn: bool.isRequired,
    setSound: func.isRequired,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.invertSound = this.invertSound.bind(this);
    }

    invertSound() {
        const { soundOn, setSound } = this.props;

        setSound(!soundOn);
    }

    render() {
        const { soundOn } = this.props;

        const soundClass = soundOn ? styles.soundOn : styles.soundOff;

        return (
            <div className={styles.home}>
                <img src={logo} className={styles.logo} alt={'Juglr'} />
                <div className={styles.buttons}>
                    <HomeButton className={styles.play} />
                    <div className={styles.buttonRow}>
                        <HomeButton className={soundClass} onClick={this.invertSound} />
                        <HomeButton className={styles.question} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
