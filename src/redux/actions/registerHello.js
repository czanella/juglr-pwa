const REGISTER_HELLO = 'REGISTER_HELLO';
function registerHello(message) {
    return {
        type: REGISTER_HELLO,
        message,
    };
}

export {
    REGISTER_HELLO,
    registerHello,
};
