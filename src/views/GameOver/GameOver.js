import React, { Component, createRef } from 'react';
import { TweenMax, Power2 } from 'gsap';
import HomeButton from '../../components/HomeButton';
import { number, func, bool } from 'prop-types';
import gameOverImage from './gameOver.png';

import styles from './styles.scss';

const propTypes = {
    score: number.isRequired,
    highScore: number.isRequired,
    width: number.isRequired,
    shouldDisassemble: bool.isRequired,
    notifyDisassembleFinish: func.isRequired,
};

const TWEEN_TIME = 0.5;
const TWEEN_STAGGER = 0.2;

class GameOver extends Component {
    constructor(props) {
        super(props);

        this.gameOver = createRef();
        this.scoreBoard = createRef();
        this.homeButton = createRef();

        this.tween = null;
    }

    componentDidMount() {
        this.assemble(true);
    }

    componentDidUpdate(prevProps) {
        const { shouldDisassemble } = this.props;

        if (!prevProps.shouldDisassemble && shouldDisassemble) {
            this.disassemble();
        }
        if (prevProps.shouldDisassemble && !shouldDisassemble) {
            this.assemble();
        }
    }

    componentWillUnmount() {
        this.killTween();
    }

    getTargets() {
        return [
            this.gameOver.current,
            this.scoreBoard.current,
            this.homeButton.current,
        ];
    }

    assemble(startOutsideScreen = false) {
        const { width } = this.props;

        this.killTween();

        const targets = this.getTargets();

        if (startOutsideScreen) {
            this.tween = TweenMax.staggerFromTo(
                targets,
                TWEEN_TIME,
                {
                    x: width,
                },
                {
                    x: 0,
                    ease: Power2.easeOut,
                },
                '+=0',
                TWEEN_STAGGER,
            );
        } else {
            this.tween = TweenMax.staggerTo(
                targets,
                TWEEN_TIME,
                {
                    x: 0,
                    ease: Power2.easeOut,
                },
                '+=0',
                TWEEN_STAGGER,
            );
        }
    }

    disassemble() {
        const { notifyDisassembleFinish, width } = this.props;

        this.killTween();

        const targets = this.getTargets();

        this.tween = TweenMax.staggerTo(
            targets,
            TWEEN_TIME,
            {
                x: -width,
                ease: Power2.easeIn,
            },
            TWEEN_STAGGER,
            '+=0',
            notifyDisassembleFinish,
        );
    }

    killTween() {
        if (this.tween) {
            this.tween.forEach(t => t.kill());
            this.tween = null;
        }
    }

    render() {
        const { score, highScore } = this.props;

        return (
            <div className={styles.gameOver}>
                <img
                    src={gameOverImage}
                    className={styles.gameOverImage}
                    alt={'Game Over'}
                    ref={this.gameOver}
                />
                <div
                    className={styles.scoreBoard}
                    ref={this.scoreBoard}
                >
                    <div className={styles.scoreLine}>
                        <p>Score</p>
                        <p>{score}</p>
                    </div>
                    <div className={styles.scoreLine}>
                        <p>Best</p>
                        <p>
                            <span className={styles.new}>
                                NEW!
                            </span>
                            {highScore}
                        </p>
                    </div>
                </div>
                <div
                    className={styles.buttonContainer}
                    ref={this.homeButton}
                >
                    <HomeButton className={styles.home} to={'/'} />
                </div>
            </div>
        );
    }
}

GameOver.propTypes = propTypes;

export default GameOver;
