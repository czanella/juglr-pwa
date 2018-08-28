const SET_DIMENSIONS = 'SET_DIMENSIONS';
function setDimensions(width, height) {
    return {
        type: SET_DIMENSIONS,
        width,
        height,
    };
}

export {
    SET_DIMENSIONS,
    setDimensions,
};
