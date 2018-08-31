import { connect } from 'react-redux';
import Game from './Game';

const mapStateToProps = (state) => {
    const { gameOn, width, height } = state;

    return { gameOn, width, height };
};

const GameContainer = connect(
    mapStateToProps,
)(Game);

export default GameContainer;
