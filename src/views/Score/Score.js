import React, { Component } from 'react';
import { bool, number, func } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    score: number.isRequired,
    shouldDisassemble: bool.isRequired,
    notifyDisassembleFinish: func.isRequired,
};

class Score extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
        };

        this.disassembleTimeout = null;

        this.assemble = this.assemble.bind(this);
    }

    componentDidMount() {
        window.setTimeout(this.assemble, 0);
    }

    componentWillUnmount() {
        this.clearTimeout();
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

    clearTimeout() {
        window.clearTimeout(this.disassembleTimeout);
    }

    assemble() {
        this.clearTimeout();
        this.disassembleTimeout = null;
        this.setState({ active: true });
    }

    disassemble() {
        const { notifyDisassembleFinish } = this.props;

        this.clearTimeout();
        this.disassembleTimeout = window.setTimeout(
            notifyDisassembleFinish,
            styles.scoreTransitionTime * 1000,
        );
        this.setState({ active: false });
    }

    render() {
        const { score } = this.props;
        const { active } = this.state;

        const classes = [styles.score];
        if (active) {
            classes.push(styles.active);
        }

        return (
            <div className={classes.join(' ')}>
                {score}
            </div>
        );
    }
}

Score.propTypes = propTypes;

export default Score;
