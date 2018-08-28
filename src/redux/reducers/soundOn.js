import { SET_SOUND } from '../actions';

function soundOn(state = true, action) {
    let newState;

    switch (action.type) {
        case SET_SOUND:
            newState = action.state;
            break;

        default:
            newState = state;
    }

    return newState;
}

export default soundOn;
