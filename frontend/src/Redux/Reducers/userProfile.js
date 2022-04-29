import {
    LOGIN,
    LOGOUT
} from '../constants';

const userProfile = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return [...state, action.payload]
        case LOGOUT:
            return state = {}
    }
    return state;
}

export default userProfile;