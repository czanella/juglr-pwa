import { REGISTER_HELLO } from '../actions';

function helloMessage(state = 'world', action) {
    let newState;

    switch (action.type) {
        case REGISTER_HELLO:
            newState = action.message;
            break;

        default:
            newState = state;
    }

    return newState;
}

export default helloMessage;
