import React from 'react';
import { Link } from 'react-router-dom';
import { func, any, string, object } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    children: any,
    onClick: func,
    className: string,
    style: object,
    to: any,
    innerRef: any,
};

const defaultProps = {
    children: null,
    onClick: null,
    className: null,
    style: null,
    to: null,
    innerRef: null,
};

function HomeButton({ children, onClick, className, style, to, innerRef }) {
    const content = (
        <div className={[styles.content, className].join(' ')}>
            {children}
        </div>
    );

    if (to) {
        return (
            <Link
                to={to}
                className={styles.homeButton}
                onClick={onClick}
                style={style}
                innerRef={innerRef}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            className={styles.homeButton}
            onClick={onClick}
            style={style}
            ref={innerRef}
        >
            {content}
        </button>
    );
}

HomeButton.propTypes = propTypes;
HomeButton.defaultProps = defaultProps;

export default HomeButton;
