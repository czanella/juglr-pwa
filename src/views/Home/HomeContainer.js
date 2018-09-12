import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from './Home';
import { setSound as setSoundAction } from '../../redux/actions';

const mapStateToProps = (state, { shouldDisassemble }) => {
    const { soundOn, height } = state;

    return { soundOn, height, shouldDisassemble };
};

const mapDispatchToProps = (dispatch, { notifyDisassembleEnd }) => {
    const setSound = state => dispatch(setSoundAction(state));

    return { setSound, notifyDisassembleEnd };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);

export default withRouter(HomeContainer);
