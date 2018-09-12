import { connect } from 'react-redux';
import About from './About';

const mapStateToProps = (state, { shouldDisassemble, notifyDisassembleEnd }) => {
    const { width } = state;

    return { width, shouldDisassemble, notifyDisassembleEnd };
};

const AboutContainer = connect(
    mapStateToProps,
)(About);

export default AboutContainer;
