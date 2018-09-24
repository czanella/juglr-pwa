import { connect } from 'react-redux';
import Game from './Game';
import { setScore as setScoreAction } from '../../redux/actions';

const mapStateToProps = (state, { match }) => {
    const { width, height, score } = state;
    const { view } = match.params;
    const gameOn = view === 'game';

    return { gameOn, score, width, height };
};

const mapDispatchToProps = (dispatch) => {
    const setScore = (score) => {
        dispatch(setScoreAction(score));
    };

    return { setScore };
}

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);

export default GameContainer;
