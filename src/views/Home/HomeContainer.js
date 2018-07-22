import { connect } from 'react-redux';

import Home from './Home';
import { registerHello } from '../../redux/actions';

const mapStateToProps = (store) => {
    const { helloMessage: message } = store;

    return { message };
};

const mapDispatchToProps = (dispatch, { history }) => {
    const changeHello = (newHello) => {
        dispatch(registerHello(newHello));
    };

    return {
        changeHello,
    };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
