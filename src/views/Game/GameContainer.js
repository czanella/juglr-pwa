import { connect } from 'react-redux';
import Game from './Game';

const mapStateToProps = (state, { match }) => {
    const { width, height } = state;
    const { view } = match.params;
    const gameOn = view === 'game';

    return { gameOn, width, height };
};

const GameContainer = connect(
    mapStateToProps,
)(Game);

export default GameContainer;
