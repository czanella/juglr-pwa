import { connect } from 'react-redux';
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

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;
