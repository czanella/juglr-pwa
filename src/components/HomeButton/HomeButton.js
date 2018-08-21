import React from 'react';
import { func, any, string, object } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    children: any,
    onClick: func,
    className: string,
    style: object,
};

const defaultProps = {
    children: null,
    onClick: null,
    className: null,
    style: null,
};

function HomeButton({ children, onClick, className, style }) {
    return (
        <button
            className={[styles.homeButton, className].join(' ')}
            style={style}
            onClick={onClick}
        >
            <div className={styles.content}>
                {children}
            </div>
        </button>
    );
}

HomeButton.propTypes = propTypes;
HomeButton.defaultProps = defaultProps;

export default HomeButton;
