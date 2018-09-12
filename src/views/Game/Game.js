import React, { Component, createRef } from 'react';
import { bool, number } from 'prop-types';
import Ball from '../../components/Ball';
import { config, randomRange } from '../../utils';

import styles from './styles.scss';

const propTypes = {
    gameOn: bool.isRequired,
    width: number.isRequired,
    height: number.isRequired,
};

class Game extends Component {
    constructor(props) {
        super(props);

        this.canvas = createRef();

        this.demoBalls = [];
        this.gameBalls = [];
        this.previousTimeStamp = null;
        this.animationId = null;

        this.gameStep = this.gameStep.bind(this);
        this.onClick = this.onClick.bind(this);
        this.removeBall = this.removeBall.bind(this);
    }

    componentDidMount() {
        this.resize();
        this.animationId = window.requestAnimationFrame(this.gameStep);

        window.addEventListener('mousedown', this.onClick);
    }

    componentDidUpdate(prevProps) {
        const { width, height, gameOn } = this.props;

        if (prevProps.width !== width || prevProps.height !== height) {
            this.resize();
        }

        if (prevProps.gameOn && !gameOn) {
            this.demoBalls = this.demoBalls.concat(this.gameBalls);
            this.gameBalls = [];
        }
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.animationId);
    }

    onClick(e) {
        const { width, height, gameOn } = this.props;
        const source = e.touches ? e.touches[0] : e;
        const touchX = source.pageX - (window.innerWidth - width) / 2;
        const touchY = source.pageY - (window.innerHeight - height) / 2;

        if (!gameOn) {
            for (let i = 0; i < 5; i++) {
                const angle = randomRange(-30, -150) * Math.PI / 180;
                const ball = new Ball(
                    touchX,
                    touchY,
                    250 * Math.cos(angle),
                    250 * Math.sin(angle),
                );
                this.addBall(ball, this.demoBalls);
            }
        }
    }

    resize() {
        const { width, height } = this.props;

        this.canvas.current.width = width;
        this.canvas.current.height = height;
    }

    gameStep(timestamp) {
        const { width, height } = this.props;
        const context = this.canvas.current.getContext('2d');
        const delta = (this.previousTimeStamp ? timestamp - this.previousTimeStamp : 0) / 1000;

        // Cleans the game canvas
        context.fillStyle = config.backgroundColor;
        context.fillRect(0, 0, width, height);

        // Moves and draws all balls
        [this.demoBalls, this.gameBalls].forEach((collection) => {
            collection.forEach((ball) => {
                ball.applyStep(delta, width);

                ball.drawOn(context);
            });
        });

        // Removes the demo balls that are off screen
        const demoBallsOff = this.demoBalls.filter(b => b.minY() >= height);
        demoBallsOff.forEach(this.removeBall);

        // Stores the timestamp and requests the next frame
        this.previousTimeStamp = timestamp;
        this.animationId = window.requestAnimationFrame(this.gameStep);
    }

    addBall(ball, collection) {
        const ballIndex = collection.indexOf(ball);

        if (ballIndex < 0) {
            collection.push(ball);
        }
    }

    removeBall(ball) {
        let ballIndex;

        [this.demoBalls, this.gameBalls].forEach((collection) => {
            ballIndex = collection.indexOf(ball);
            if (ballIndex >= 0) {
                collection.splice(ballIndex, 1);
            }
        });
    }

    removeAllBalls() {
        [this.demoBalls, this.gameBalls].forEach(collection => collection.splice(0));
    }

    ballsOffScreen() {
        return this.balls.filter(b => b.y - b.radius >= this.height);
    }

    render() {
        return <canvas ref={this.canvas} className={styles.game} />;
    }
}

Game.propTypes = propTypes;

export default Game;
