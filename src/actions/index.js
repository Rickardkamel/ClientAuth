import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    VALIDATE_USER
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
            .then(response => {
                // create form-data object for API
                // and log user in to get token.
                let body = new FormData();
                body.append('user', username);
                body.append('password', password);
                axios.post(`${API_URL}/authenticate/user`, body)
                    .then(response => {
                        dispatch({ type: AUTH_USER });
                        localStorage.setItem('token', response.data.token);
                        browserHistory.push('/feature');
                    })
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            })
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

export function verifyCharacter() {
    let body = {
        account: "nokka",
        character: "nokkatrapper"
    }
    // TODO: Kolla med Stefan varför vi inte kan
    // skicka med "Authorization" header.
    return function (dispatch) {
        axios.post(`${API_URL}/verify/character`, body, {
            headers:
            {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response);
                dispatch({
                    type: VALIDATE_USER,
                    payload: response.data.message
                });
            })
            .catch(err => {
                console.log(err.response);
            })
        /*
                Authorization:Bearer TKN
                 */
    }
}
