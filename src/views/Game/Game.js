import React, { Component, createRef } from 'react';
import { bool, number } from 'prop-types';
import { config } from '../../utils';

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
        this.collections = [this.demoBalls, this.gameBalls];
        this.previousTimeStamp = null;
        this.animationId = null;

        this.gameStep = this.gameStep.bind(this);
    }

    componentDidMount() {
        this.resize();
        this.animationId = window.requestAnimationFrame(this.gameStep);
    }

    componentDidUpdate(prevProps) {
        const { width, height } = this.props;

        if (prevProps.width !== width || prevProps.height !== height) {
            this.resize();
        }
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.animationId);
    }

    resize() {
        const { width, height } = this.props;

        this.canvas.current.width = width;
        this.canvas.current.height = height;
    }

    gameStep(timestamp) {
        const { width, height } = this.props;
        const context = this.canvas.current.getContext('2d');

        // Cleans the game canvas
        context.fillStyle = config.backgroundColor;
        context.fillRect(0, 0, width, height);

        // Moves all balls
        this.collections.forEach((collection) => {
            collection.forEach((ball) => {
                const originalY = ball.y;
    
                ball.applyGravity(delta, config.gravity);
                if (ball.x - ball.radius < 0) {
                    ball.x = ball.radius + (ball.radius - ball.x);
                    ball.speedX = -ball.speedX;
                }
                if (ball.x >= width - ball.radius) {
                    ball.x = (width - ball.radius) - (ball.x - (width - ball.radius));
                    ball.speedX = -ball.speedX;
                }
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

        this.collections.forEach((collection) => {
            ballIndex = collection.indexOf(ball);
            if (ballIndex >= 0) {
                collection.splice(ballIndex, 1);
            }
        });
    }

    removeAllBalls() {
        this.collections.forEach(collection => collection.splice(0));
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
