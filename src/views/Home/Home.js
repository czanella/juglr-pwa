import React, { Component } from 'react';
import logo from './logo.png';
import HomeButton from '../../components/HomeButton';
import soundOn from './soundOn.png';
import soundOff from './soundOff.png';

import styles from './styles.scss';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.home}>
                <img src={logo} className={styles.logo} alt={'Juglr'} />
                <div className={styles.buttons}>
                    <HomeButton>
                        Play
                    </HomeButton>
                    <div className={styles.buttonRow}>
                        <HomeButton>
                            <img src={soundOn} />
                        </HomeButton>
                        <HomeButton>
                            ?
                        </HomeButton>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;
