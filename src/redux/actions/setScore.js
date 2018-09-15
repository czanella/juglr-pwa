const SET_SCORE = 'SET_SCORE';
function setScore(width, newScore) {
    return {
        type: SET_SCORE,
        newScore,
    };
}

export {
    SET_SCORE,
    setScore,
};
