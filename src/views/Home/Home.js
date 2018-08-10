import React, { Component } from 'react';
import OutlineText from '../../components/OutlineText';
import logo from './logo.png';

import styles from './styles.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    componentDidMount() {
        this.intervalId = window.setInterval(this.increaseCount, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }

    increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        const { count } = this.state;
        return (
            <div className={styles.home}>
                <img src={logo} className={styles.logo} alt={'Juglr'} />
                <OutlineText size={40} strokeWidth={4}>
                    {count.toString()}
                </OutlineText>
            </div>
        );
    }
}

export default Home;
