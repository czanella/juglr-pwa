import { randomPick, config } from '../../utils';
import CircularQueue from './CircularQueue';
import TrailPoint from './TrailPoint';

const TWO_PI = 2 * Math.PI;

class Ball {
    constructor(x = 0, y = 0, speedX = 0, speedY = 0, color = null) {
        this.color = color || randomPick(config.ballColors);

        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;

        this.trail = new CircularQueue(config.trailLength, new TrailPoint({ x, y }));
    }

    drawOn(context) {
        context.save();

        context.fillStyle = this.color[1];
        const trailPoints = this.trail.map((p, i) => {
            return p.sidePoints(config.ballRadius * i / (config.trailLength - 1));
        });
        context.beginPath();
        context.moveTo(trailPoints[0].left.x, trailPoints[0].left.y);
        for (let i = 1; i < trailPoints.length; i++) {
            context.lineTo(trailPoints[i].left.x, trailPoints[i].left.y)
        }
        for (let i = trailPoints.length - 1; i >= 0; i--) {
            context.lineTo(trailPoints[i].right.x, trailPoints[i].right.y)
        }
        context.fill();

        context.fillStyle = this.color[0];
        context.beginPath();
        context.arc(this.x, this.y, config.ballRadius, 0, TWO_PI);
        context.fill();

        context.restore();
    }

    minY() {
        return this.trail.tail().y;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.trail.add(new TrailPoint({ x, y }, this.trail.head()));
    }

    applyStep(delta, maxX) {
        this.speedY += config.gravity * delta;

        let newX = this.x + this.speedX * delta;
        const newY = this.y + this.speedY * delta;

        if (newX < config.ballRadius && this.speedX <= 0) {
            newX = 2 * config.ballRadius - newX;
            this.speedX *= -1;
        }
        if (newX > maxX - config.ballRadius && this.speedX >= 0) {
            newX = 2 * (maxX - config.ballRadius) - newX;
            this.speedX *= -1;
        }

        this.setPosition(newX, newY);
    }

    distance2(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;

        return dx * dx + dy * dy;
    }

    distance(x, y) {
        return Math.sqrt(this.distance2(x, y));
    }
}

export default Ball;
