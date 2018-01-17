import {
    SIGNOUT,
    AUTH_USER
} from '../actions/auth';

import {
    CHANGE_AVATAR
} from '../actions/profile';

const auth = (state = {}, action) => {
    switch (action.type) {
        case SIGNOUT:
            return {
                isAuthenticated: false
            };
        case AUTH_USER:
            return {
                isAuthenticated: true,
                user: action.user
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}

export default auth;