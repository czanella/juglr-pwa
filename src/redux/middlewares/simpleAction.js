/* eslint no-unused-vars: 0 */

// A react-redux middleware to simplify actions with no parameters in
// Redux apps
const simpleAction = store => next => (action) => {
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

export default simpleAction;
