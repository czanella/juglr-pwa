import { SET_DIMENSIONS } from '../actions';

function width(state = 0, action) {
    let newState;

    switch (action.type) {
        case SET_DIMENSIONS:
            newState = action.width;
            break;

        default:
            newState = state;
    }

    return newState;
}

export default width;
