import { connect } from 'react-redux';
import GameOver from './GameOver';

const mapStateToProps = (state, { shouldDisassemble, notifyDisassembleFinish }) => {
    const { score, highScore } = state;

    return { score, highScore, shouldDisassemble, notifyDisassembleFinish };
};

const GameOverContainer = connect(
    mapStateToProps,
)(GameOver);

export default GameOverContainer;
