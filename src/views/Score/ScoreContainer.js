import { connect } from 'react-redux';
import Score from './Score';
import {
    setScore as setScoreAction,
    START_GAME,
    END_GAME,
} from '../../redux/actions';

const mapStateToProps = (state, { shouldDisassemble, notifyDisassembleFinish }) => {
    const { score } = state;

    return { score, shouldDisassemble, notifyDisassembleFinish };
};

const ScoreContainer = connect(
    mapStateToProps,
)(Score);

export default ScoreContainer;
