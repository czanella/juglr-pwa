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
    navigate: func.isRequired,
    shouldDisassemble: bool.isRequired,
    notifyDisassembleEnd: func.isRequired,
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
        this.assemble(true);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.shouldDisassemble && this.props.shouldDisassemble) {
            this.disassemble();
        }
        if (prevProps.shouldDisassemble && !this.props.shouldDisassemble) {
            this.assemble();
        }
    }

    componentWillUnmount() {
        this.killTween();
    }

    assemble(startOutsideScreen = false) {
        this.killTween();

        const targets = shuffle([
            this.logo.current,
            this.playButton.current.root.current,
            this.soundButton.current.root.current,
            this.aboutButton.current.root.current,
        ]);

        if (startOutsideScreen) {
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
        } else {
            this.tween = TweenMax.staggerTo(
                targets,
                1,
                {
                    y: 0,
                    rotation: 0,
                    ease: Back.easeOut,
                },
                0.1,
            );
        }
    }

    disassemble() {
        const { notifyDisassembleEnd } = this.props;

        this.killTween();

        const targets = shuffle([
            this.logo.current,
            this.playButton.current.root.current,
            this.soundButton.current.root.current,
            this.aboutButton.current.root.current,
        ]);

        this.tween = TweenMax.staggerTo(
            targets,
            1,
            {
                y: window.innerHeight,
                rotation: () => 60 - 120 * Math.random(),
                ease: Back.easeIn,
            },
            0.1,
            notifyDisassembleEnd,
        );
    }

    killTween() {
        if (this.tween) {
            this.tween.forEach(t => t.kill());
            this.tween = null;
        }
    }

    invertSound() {
        const { soundOn, setSound } = this.props;

        setSound(!soundOn);
    }

    render() {
        const { soundOn, navigate } = this.props;

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
                        onClick={() => navigate('/game')}
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

Home.propTypes = propTypes;

export default Home;
