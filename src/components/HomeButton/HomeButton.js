import React, { Component, createRef } from 'react';
import { func, any, string } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    children: any,
    onClick: func,
    className: string,
};

const defaultProps = {
    children: null,
    onClick: null,
    className: null,
    style: null,
};

class HomeButton extends Component {
    constructor(props) {
        super(props);

        this.root = createRef();
    }

    render() {
        const { children, onClick, className } = this.props;
        return (
            <button
                className={styles.homeButton}
                onClick={onClick}
                ref={this.root}
            >
                <div className={[styles.content, className].join(' ')}>
                    {children}
                </div>
            </button>
        );
    }
}

HomeButton.propTypes = propTypes;
HomeButton.defaultProps = defaultProps;

export default HomeButton;
