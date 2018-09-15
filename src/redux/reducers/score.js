import { SET_SCORE, START_GAME } from '../actions';

function score(state = 0, action) {
    let newState;

    switch (action.type) {
        case SET_SCORE:
            newState = action.newScore;
            break;

        case START_GAME:
            newState = 0;
            break;

        default:
            newState = state;
    }

    return newState;
}

export default score;
