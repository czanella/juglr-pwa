// SIMPLE ACTIONS - sync actions with no parameters
export * from './simpleActions';

// REGULAR ACTIONS - sync actions with parameters
export {
    SET_DIMENSIONS,
    setDimensions,
} from './setDimensions';

export {
    SET_SOUND,
    setSound,
} from './setSound';

export {
    SET_SCORE,
    setScore,
} from './setScore';

// THUNKS - async actions
// export { login } from './thunks/login';
// export { logout } from './thunks/logout';
