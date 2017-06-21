import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

const API_URL = 'http://localhost:8090'

export function signinUser({username, password}) {
    // create form-data object for API
    let body = new FormData();
    body.append('user', username);
    body.append('password', password);

    return function (dispatch) {
        // Submit username/password to server
        axios.post(`${API_URL}/authenticate/user`, body)
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - Redirect to the route /feature
                browserHistory.push('/feature')
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad login'))
            });
    }
}

export function signupUser({ username, password}) {
    let body = {
        username,
        password
    }
    return function (dispatch) {
        axios.post(`${API_URL}/register/user`, body)
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}