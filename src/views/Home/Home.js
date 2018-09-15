import React, { Component, createRef } from 'react';
import { TweenMax, Back } from 'gsap';
import { bool, func, number } from 'prop-types';
import { shuffle } from '../../utils';
import logo from './logo.png';
import HomeButton from '../../components/HomeButton';

import styles from './styles.scss';

const propTypes = {
    height: number.isRequired,
    soundOn: bool.isRequired,
    setSound: func.isRequired,
    shouldDisassemble: bool.isRequired,
    notifyDisassembleFinish: func.isRequired,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.logo = null;
        this.playButton = null;
        this.soundButton = null;
        this.aboutButton = null;

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

    getTargets() {
        return shuffle([
            this.logo,
            this.playButton,
            this.soundButton,
            this.aboutButton,
        ]);
    }

    assemble(startOutsideScreen = false) {
        const { height } = this.props;

        this.killTween();

        const targets = this.getTargets();

        if (startOutsideScreen) {
            this.tween = TweenMax.staggerFromTo(
                targets,
                1,
                {
                    y: height,
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
        const { notifyDisassembleFinish, height } = this.props;

        this.killTween();

        const targets = this.getTargets();

        this.tween = TweenMax.staggerTo(
            targets,
            1,
            {
                y: height,
                rotation: () => 60 - 120 * Math.random(),
                ease: Back.easeIn,
            },
            0.1,
            notifyDisassembleFinish,
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
        const { soundOn } = this.props;

        const soundClass = soundOn ? styles.soundOn : styles.soundOff;

        return (
            <div className={styles.home}>
                <img
                    src={logo}
                    className={styles.logo} alt={'Juglr'}
                    ref={r => this.logo = r}
                />
                <div className={styles.buttons}>
                    <HomeButton
                        className={styles.play}
                        to={'/game'}
                        innerRef={r => this.playButton = r}
                    />
                    <div className={styles.buttonRow}>
                        <HomeButton
                            className={soundClass}
                            onClick={this.invertSound}
                            innerRef={r => this.soundButton = r}
                        />
                        <HomeButton
                            className={styles.question}
                            to={'/about'}
                            innerRef={r => this.aboutButton = r}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = propTypes;

export default Home;
