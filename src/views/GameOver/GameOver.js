import React, { Component, createRef } from 'react';
import { TweenMax, Power2 } from 'gsap';
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
    }

    componentDidMount() {
        this.assemble();
    }

    componentDidUpdate(prevProps) {

    }

    assemble() {

    }

    disassemble() {

    }

    render() {
        return (
            <div className={styles.gameOver}>
                <img
                    src={gameOverImage}
                    className={styles.gameOverImage}
                    alt={'Game Over'}
                    ref={this.gameOver}
                />
            </div>
        );
    }
}

GameOver.propTypes = propTypes;

export default GameOver;
