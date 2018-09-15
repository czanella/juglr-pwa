import { connect } from 'react-redux';
import About from './About';

const mapStateToProps = (state, { shouldDisassemble, notifyDisassembleFinish }) => {
    const { width } = state;

    return { width, shouldDisassemble, notifyDisassembleFinish };
};

const AboutContainer = connect(
    mapStateToProps,
)(About);

export default AboutContainer;
