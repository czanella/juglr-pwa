function storedReducer(reducer, isRootReducer = false) {
    return (state, action) => {
        const newState = reducer(state, action);
        if (state !== newState
            && typeof window !== 'undefined'
            && action.type.indexOf('@@redux') < 0) {
            let __STORED_STATE__; 

            if (isRootReducer) {
                __STORED_STATE__ = newState;
            } else {
                __STORED_STATE__ = JSON.parse(
                    window.localStorage.getItem(storedReducer.storageKey),
                ) || {};
                __STORED_STATE__[reducer.name] = newState;
            }

            window.localStorage.setItem(
                storedReducer.storageKey,
                JSON.stringify(__STORED_STATE__),
            );
        }

        return newState;
    };
}

storedReducer.storageKey = '__STORED_STATE__';

export default storedReducer;
