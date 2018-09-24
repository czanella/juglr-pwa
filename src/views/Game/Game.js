import React, { Component, createRef } from 'react';
import { bool, number, func } from 'prop-types';
import Ball from '../../components/Ball';
import { config, randomRange } from '../../utils';

import styles from './styles.scss';

const propTypes = {
    gameOn: bool.isRequired,
    score: number.isRequired,
    width: number.isRequired,
    height: number.isRequired,
    setScore: func.isRequired,
};

const HIT_DISTANCE2 = config.hitAreaRadius ** 2;

class Game extends Component {
    constructor(props) {
        super(props);

        this.canvas = createRef();

        this.demoBalls = [];
        this.gameBalls = [];
        this.previousTimeStamp = null;
        this.animationId = null;
        this.ballLauncherId = null;

        this.gameStep = this.gameStep.bind(this);
        this.onClick = this.onClick.bind(this);
        this.launchBall = this.launchBall.bind(this);
        this.removeBall = this.removeBall.bind(this);
    }

    componentDidMount() {
        const { gameOn } = this.props;

        this.resize();
        this.animationId = window.requestAnimationFrame(this.gameStep);

        window.addEventListener('mousedown', this.onClick);

        if (gameOn) {
            this.startGame();
        }
    }

    componentDidUpdate(prevProps) {
        const { width, height, gameOn } = this.props;

        if (prevProps.width !== width || prevProps.height !== height) {
            this.resize();
        }

        if (!prevProps.gameOn && gameOn) {
            this.startGame();
        }

        if (prevProps.gameOn && !gameOn) {
            this.stopGame();
        }
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.animationId);
    }

    startGame() {
        this.ballLauncherId = window.setTimeout(
            this.launchBall,
            config.firstBallInterval,
        );
    }

    stopGame() {
        window.clearTimeout(this.ballLauncherId);
        this.ballLauncherId = null;
        this.demoBalls = this.demoBalls.concat(this.gameBalls);
        this.gameBalls = [];
    }

    gameStep(timestamp) {
        const { width, height, gameOn } = this.props;
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
        if (this.demoBalls.length > 0) {
            const demoBallsOff = this.demoBalls.filter(b => b.minY() >= height);
            demoBallsOff.forEach(this.removeBall);
        }

        // The actual logic of the game
        if (gameOn) {
            // Check if any game ball is off screen. If so, game over, man!
            const gameBallsOff = this.gameBalls.filter(
                b => b.y >= height && b.speedY > 0,
            );
            gameBallsOff.forEach(this.removeBall);
        }

        // Stores the timestamp and requests the next frame
        this.previousTimeStamp = timestamp;
        this.animationId = window.requestAnimationFrame(this.gameStep);
    }

    onClick(e) {
        e.preventDefault();
        
        const { width, height, gameOn, score, setScore } = this.props;
        const source = e.touches ? e.touches[0] : e;
        const touchX = source.pageX - (window.innerWidth - width) / 2;
        const touchY = source.pageY - (window.innerHeight - height) / 2;

        if (!gameOn) {
            for (let i = 0; i < 5; i++) {
                const angle = randomRange(...config.demoBallAngle);
                const ball = new Ball(
                    touchX,
                    touchY,
                    250 * Math.cos(angle),
                    250 * Math.sin(angle),
                );
                this.addBall(ball, this.demoBalls);
            }
        } else {
            this.gameBalls.forEach((ball) => {
                if (ball.distance2(touchX, touchY) <= HIT_DISTANCE2) {
                    const angle = randomRange(...config.tapAngle);
                    const speed = randomRange(...config.tapImpulse);
                    ball.speedX = speed * Math.cos(angle);
                    ball.speedY = -speed * Math.sin(angle);
    
                    setScore(score + 1);
                }
            });
        }
    }

    addBall(ball, collection) {
        const ballIndex = collection.indexOf(ball);

        if (ballIndex < 0) {
            collection.push(ball);
        }
    }

    launchBall() {
        const { width, height } = this.props;

        const newBall = new Ball(
            randomRange(config.ballRadius, width - config.ballRadius),
            height + config.ballRadius,
            randomRange(...config.initialSpeedX),
            randomRange(...config.initialSpeedY),
        );

        this.addBall(newBall, this.gameBalls);
        this.ballLauncherId = window.setTimeout(
            this.launchBall,
            randomRange(...config.newBallInterval),
        );
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

    resize() {
        const { width, height } = this.props;

        this.canvas.current.width = width;
        this.canvas.current.height = height;
    }

    render() {
        return <canvas ref={this.canvas} className={styles.game} />;
    }
}

Game.propTypes = propTypes;

export default Game;
