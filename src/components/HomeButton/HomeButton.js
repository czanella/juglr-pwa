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
    innerRef: any,
};

function HomeButton({ children, onClick, className, style, to, innerRef }) {
    const buttonProps = {
        className: styles.homeButton,
        onClick: onClick,
        style: style,
    };
    let ButtonClass;

    if (to) {
        ButtonClass = Link;
        Object.assign(buttonProps, {
            innerRef,
            to,
        });
    } else {
        ButtonClass = 'button';
        buttonProps.ref = innerRef;
    }

    return (
        <ButtonClass {...buttonProps}>
            <div className={[styles.content, className].join(' ')}>
                {children}
            </div>
        </ButtonClass>
    );
}

HomeButton.propTypes = propTypes;
HomeButton.defaultProps = defaultProps;

export default HomeButton;
