const SET_SOUND = 'SET_SOUND';
function setSound(state) {
    return {
        type: SET_SOUND,
        state,
    };
}

export {
    SET_SOUND,
    setSound,
};
