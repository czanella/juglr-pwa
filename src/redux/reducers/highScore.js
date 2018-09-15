import { SET_SCORE } from '../actions';
import { storedReducer } from '../utils';

function highScore(state = 0, action) {
    let newState;

    switch (action.type) {
        case SET_SCORE:
            newState = Math.max(state, action.newScore);
            break;

        default:
            newState = state;
    }

    return newState;
}

export default storedReducer(highScore);
