import { connect } from 'react-redux';
import GameOver from './GameOver';

const mapStateToProps = (state, { shouldDisassemble, notifyDisassembleFinish }) => {
    const { score, highScore, width } = state;

    return {
        score,
        highScore,
        shouldDisassemble,
        notifyDisassembleFinish,
        width,
    };
};

const GameOverContainer = connect(
    mapStateToProps,
)(GameOver);

export default GameOverContainer;
