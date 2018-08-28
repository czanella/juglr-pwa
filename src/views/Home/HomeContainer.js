import { connect } from 'react-redux';
import Home from './Home';
import { setSound as setSoundAction } from '../../redux/actions';

const mapStateToProps = (state) => {
    const { soundOn } = state;

    return { soundOn };
};

const mapDispatchToProps = (dispatch) => {
    const setSound = state => dispatch(setSoundAction(state));

    return { setSound };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);

export default HomeContainer;
