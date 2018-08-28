import { SET_DIMENSIONS } from '../actions';

function height(state = 0, action) {
    let newState;

    switch (action.type) {
        case SET_DIMENSIONS:
            newState = action.height;
            break;

        default:
            newState = state;
    }

    return newState;
}

export default height;
