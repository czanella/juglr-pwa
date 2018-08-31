import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from './Home';
import { setSound as setSoundAction } from '../../redux/actions';

const mapStateToProps = (state, { shouldDisassemble }) => {
    const { soundOn } = state;

    return { soundOn, shouldDisassemble };
};

const mapDispatchToProps = (dispatch, { history, notifyDisassembleEnd }) => {
    const setSound = state => dispatch(setSoundAction(state));
    const navigate = to => history.push(to);

    return { setSound, navigate, notifyDisassembleEnd };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);

export default withRouter(HomeContainer);
