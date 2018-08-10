import React, { Component, createRef } from 'react';
import { number, string } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    size: number,
    strokeWidth: number,
    children: string.isRequired,
    className: string,
};

const defaultProps = {
    size: 20,
    strokeWidth: 5,
    className: null,
};

class OutlineText extends Component {
    constructor(props) {
        super(props);

        this.canvas = createRef();
    }

    componentDidMount() {
        this.renderText();
    }

    componentDidUpdate(prevProps) {
        const { children: prevChildren } = prevProps;
        const { children } = this.props;

        if (prevChildren !== children) {
            this.renderText();
        }
    }

    renderText() {
        const { children, size, strokeWidth } = this.props;
        
        // Resize the canvas
        this.context = this.canvas.current.getContext('2d');
        this.context.font = `${size}pt Pixellari`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        const canvasHeight = size + 4 * strokeWidth;
        const canvasWidth = this.context.measureText(children).width + 4 * strokeWidth;
        this.canvas.current.width = canvasWidth;
        this.canvas.current.height = canvasHeight;

        // Resets the text options
        this.context.font = `${size}pt Pixellari`;
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        // Draws the text
        this.context.lineCap = 'round';
        this.context.lineWidth = 4 * strokeWidth;
        this.context.strokeStyle = styles.red;
        this.context.strokeText(children, canvasWidth / 2, canvasHeight / 2 + 4);

        this.context.lineWidth = 2 * strokeWidth;
        this.context.strokeStyle = styles.black;
        this.context.strokeText(children, canvasWidth / 2, canvasHeight / 2 + 4);

        this.context.fillStyle = styles.white;
        this.context.fillText(children, canvasWidth / 2, canvasHeight / 2 + 4);
    }

    render() {
        const { className } = this.props;

        return <canvas className={className} ref={this.canvas} />;
    }
}

OutlineText.propTypes = propTypes;
OutlineText.defaultProps = defaultProps;

export default OutlineText;
