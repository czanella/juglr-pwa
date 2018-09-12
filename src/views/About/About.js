import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { TweenMax, Power2 } from 'gsap';
import { bool, func, number } from 'prop-types';

import styles from './styles.scss';

const propTypes = {
    shouldDisassemble: bool.isRequired,
    notifyDisassembleEnd: func.isRequired,
    width: number.isRequired,
};

class About extends Component {
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
        if (!prevProps.shouldDisassemble && this.props.shouldDisassemble) {
            this.disassemble();
        }

        if (prevProps.shouldDisassemble && !this.props.shouldDisassemble) {
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

        this.tween = TweenMax.to(this.root.current, 0.5, {
            x: 0,
            ease: Power2.easeOut,
            delay: 0.75,
        });
    }

    disassemble() {
        const { notifyDisassembleEnd, width } = this.props;

        this.killTween();

        this.tween = TweenMax.to(this.root.current, 0.5, {
            x: -width,
            ease: Power2.easeIn,
            onComplete: notifyDisassembleEnd,
        });
    }

    render() {
        return (
            <div className={styles.about} ref={this.root}>
                <p>Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass. </p>
                <p>My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand? </p>
                <p>Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing. </p>
            </div>
        );
    }
}

About.propTypes = propTypes;

export default About;
