import React, { Component, createRef } from 'react';
import { TweenMax, Power2 } from 'gsap';
import HomeButton from '../../components/HomeButton';
import { number, func, bool } from 'prop-types';
import gameOverImage from './gameOver.png';

import styles from './styles.scss';

const propTypes = {
    score: number.isRequired,
    highScore: number.isRequired,
    shouldDisassemble: bool.isRequired,
    notifyDisassembleFinish: func.isRequired,
};

class GameOver extends Component {
    constructor(props) {
        super(props);

        this.gameOver = createRef();
        this.tween = null;
        this.homeButton = null;
    }

    componentDidMount() {
        this.assemble();
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

    assemble() {

    }

    disassemble() {

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
                <div className={styles.scoreBoard}>
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
                <div className={styles.buttonContainer}>
                    <HomeButton
                        className={styles.home}
                        to={'/'}
                        innerRef={r => this.homeButton = r}
                    />
                </div>
            </div>
        );
    }
}

GameOver.propTypes = propTypes;

export default GameOver;
