import React, { Component, createRef } from 'react';
import { TweenMax, Power2 } from 'gsap';
import { bool, number, func } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    score: number.isRequired,
    shouldDisassemble: bool.isRequired,
    notifyDisassembleFinish: func.isRequired,
};

const TWEEN_TIME = 0.5;

class Score extends Component {
    constructor(props) {
        super(props);

        this.tween = null;
        this.root = createRef();
    }

    componentDidMount() {
        this.assemble();
    }

    componentWillUnmount() {
        this.killTween();
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

    killTween() {
        if (this.tween) {
            this.tween.kill();
            this.tween = null;
        }
    }

    assemble() {
        this.killTween();
        this.tween = TweenMax.to(
            this.root.current,
            TWEEN_TIME,
            {
                y: 0,
                ease: Power2.easeOut,
            },
        );
    }

    disassemble() {
        const { notifyDisassembleFinish } = this.props;

        this.killTween();
        this.tween = TweenMax.to(
            this.root.current,
            TWEEN_TIME,
            {
                y: -styles.scoreOutsidePosition,
                ease: Power2.easeIn,
            },
        );
    }

    render() {
        const { score } = this.props;

        return (
            <div className={styles.score} ref={this.root}>
                {score}
            </div>
        );
    }
}

Score.propTypes = propTypes;

export default Score;
