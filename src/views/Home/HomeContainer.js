import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from './Home';
import { setSound as setSoundAction } from '../../redux/actions';

const mapStateToProps = (state, { shouldEvacuate }) => {
    const { soundOn } = state;

    return { soundOn, shouldEvacuate };
};

const mapDispatchToProps = (dispatch, { history, notifyEvacuationEnd }) => {
    const setSound = state => dispatch(setSoundAction(state));
    const navigate = to => history.push(to);

    return { setSound, navigate, notifyEvacuationEnd };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);

export default withRouter(HomeContainer);
