import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    AUTH_USER,
    AUTH_ERROR
} from './types';

const API_URL = 'http://localhost:8090'

export function signinUser({ username, password }) {
    let body = {
        user: "admin",
        password: "hejsan"
    }
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
            })
            
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}