import React from 'react';
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

function HomeButton({ children, onClick, className }) {
    return (
        <button
            className={styles.homeButton}
            onClick={onClick}
        >
            <div className={[styles.content, className].join(' ')}>
                {children}
            </div>
        </button>
    );
}

HomeButton.propTypes = propTypes;
HomeButton.defaultProps = defaultProps;

export default HomeButton;
