import {
    LOGIN,
    LOGOUT
} from '../constants';

export const loginUser = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT
    }
}