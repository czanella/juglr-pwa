import React, { Component, createRef } from 'react';
import { TweenMax, Back } from 'gsap';
import { bool, func } from 'prop-types';
import { shuffle } from '../../utils';
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

        this.logo = createRef();
        this.playButton = createRef();
        this.soundButton = createRef();
        this.aboutButton = createRef();

        this.tween = null;

        this.invertSound = this.invertSound.bind(this);
    }

    componentDidMount() {
        const targets = shuffle([
            this.logo.current,
            this.playButton.current.root.current,
            this.soundButton.current.root.current,
            this.aboutButton.current.root.current,
        ]);

        this.tween = TweenMax.staggerFromTo(
            targets,
            1,
            {
                y: window.innerHeight,
                rotation: () => 60 - 120 * Math.random(),
            },
            {
                y: 0,
                rotation: 0,
                ease: Back.easeOut,
            },
            0.1,
        );
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
                <img
                    src={logo}
                    className={styles.logo} alt={'Juglr'}
                    ref={this.logo}
                />
                <div className={styles.buttons}>
                    <HomeButton
                        className={styles.play}
                        ref={this.playButton}
                    />
                    <div className={styles.buttonRow}>
                        <HomeButton
                            className={soundClass}
                            onClick={this.invertSound}
                            ref={this.soundButton}
                        />
                        <HomeButton
                            className={styles.question}
                            ref={this.aboutButton}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
