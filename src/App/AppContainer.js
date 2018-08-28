import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './App';
import { setDimensions as setDimensionsAction } from '../redux/actions';

const mapStateToProps = (state) => {
    const { width, height } = state;

    return { width, height };
};

const mapDispatchToProps = (dispatch) => {
    const setDimensions = (w, h) => dispatch(setDimensionsAction(w, h));

    return { setDimensions };
};

const AppContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));

export default AppContainer;
