import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    VALIDATE_USER
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload }
        case VALIDATE_USER:
            return { ...state, message: action.payload }
    }

    return state;
}